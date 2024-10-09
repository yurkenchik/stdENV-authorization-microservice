import {
    BadRequestException,
    HttpException,
    Inject,
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";
import {TokenService} from "../token/token.service";
import {ClientProxy} from "@nestjs/microservices";
import {firstValueFrom} from "rxjs";
import {DeleteResult, Repository} from "typeorm";
import {RegistrationInput} from "@studENV/shared/dist/inputs/authorization/registration.input";
import {LoginInput} from "@studENV/shared/dist/inputs/authorization/login.input";
import {AuthenticationOutput} from "@studENV/shared/dist/outputs/authoirization/authentication.output";
import {User} from "@studENV/shared/dist/entities/user.entity";
import {Role} from "@studENV/shared/dist/entities/role.entity"
import {InjectRepository} from "@nestjs/typeorm";
import {RoleEnum} from "@studENV/shared/dist/utils/role.enum";
import {UserStatusEnum} from "@studENV/shared/dist/utils/user-status.enum";
import {IAuthorizationRepository} from "./interfaces/authorization-repository.interface";
import {AuthorizationMicroserviceController} from "./authorization-microservice.controller";

@Injectable()
export class AuthorizationService implements IAuthorizationRepository {

    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
        @Inject("NATS_SERVICE")
        private readonly natsClient: ClientProxy,
        private readonly tokenService: TokenService,
    ) {}

    private readonly logger = new Logger(AuthorizationMicroserviceController.name);

    async registration(registrationInput: RegistrationInput): Promise<User> {
        try {
            const role = await this.roleRepository
                .createQueryBuilder()
                .where("role = :role", { role: registrationInput.role })
                .getOne();
            if (!role) throw new NotFoundException("Role not found");

            const hashedPassword = await bcrypt.hash(registrationInput.password, 5);
            const createdUser: User = await firstValueFrom(
                this.natsClient.send({ cmd: "createUser" }, {
                    createUserInput: {
                        ...registrationInput,
                        password: hashedPassword,
                    },
                    role
                })
            );

            const randomlyGeneratedVerificationCode = Math.floor(100000 + Math.random() * 900000);

            if (createdUser.role.role !== RoleEnum.TEACHER) {
                await firstValueFrom(
                    this.natsClient.send({ cmd: "updateUser" }, {
                        userId: createdUser.id,
                        updateUserInput: {
                            status: UserStatusEnum.ACTIVE,
                            verificationCode: randomlyGeneratedVerificationCode
                        }
                    })
                )
            } else {
                await firstValueFrom(
                    this.natsClient.send({ cmd: "updateUser" }, {
                        userId: createdUser.id,
                        updateUserInput: {
                            verificationCode: randomlyGeneratedVerificationCode
                        }
                    })
                )
            }

            const registeredUser = await firstValueFrom(
                this.natsClient.send({ cmd: "getUserByEmail" }, createdUser.email)
            );

            await firstValueFrom(
                this.natsClient.send({ cmd: "sendVerificationCodeEmail" }, {
                    recipient: registrationInput.email,
                    verificationCode: randomlyGeneratedVerificationCode
                })
            );

            return registeredUser;
        } catch (error) {
            this.logger.log(JSON.stringify({message: `Error: ${error.message}`}));
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException(error.message);
        }
    }
    
    async login(loginInput: LoginInput): Promise<AuthenticationOutput> {
        try {
            const user = await firstValueFrom(
                this.natsClient.send({ cmd: "getUserByEmail" }, loginInput.email)
            );
            if (!user) throw new NotFoundException("User not found");

            const validatePasswords = await bcrypt.compare(loginInput.password, user.password);
            if (!validatePasswords) throw new BadRequestException("Passwords do not match");
            
            const generatedToken = await this.tokenService.generateToken(user);
            return { user, token: generatedToken }
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException(error.message);
        }
    }

    async deleteAccount(userId: string): Promise<DeleteResult> {
        try {
            return await firstValueFrom(
                this.natsClient.send({  cmd: "deleteUser" }, userId)
            );
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException(error.message);
        }
    }

    async verifyUserAccountViaEmail(email: string, verificationCode: string): Promise<AuthenticationOutput> {
        try {
            const user: User = await firstValueFrom(
                this.natsClient.send({ cmd: "getUserByEmail" }, email)
            );

            if (user.verificationCode !== verificationCode) {
                throw new BadRequestException("Codes don't match");
            }

            const updatedUser: User = await firstValueFrom(
                this.natsClient.send({ cmd: "updateUser" }, {
                    userId: user.id,
                    updateUserInput: {
                        isAccountVerified: true,
                        verificationCode: null
                    }
                })
            )

            const generatedToken = await this.tokenService.generateToken(user);
            return { user: updatedUser, token: generatedToken };
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException(error.message);
        }
    }
    
}