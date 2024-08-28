import {BadRequestException, HttpException, Inject, Injectable, InternalServerErrorException, Logger, NotFoundException, UseFilters} from "@nestjs/common";
import * as bcrypt from "bcrypt";
import {TokenService} from "../token/token.service";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { DeleteResult } from "typeorm";
import { RegistrationInput } from "@studENV/shared/dist/inputs/authorization/registration.input";
import { LoginInput } from "@studENV/shared/dist/inputs/authorization/login.input";
import { AuthenticationOutput } from "@studENV/shared/dist/outputs/authoirization/authentication.output";
import {MSRpcExceptionFilter} from "@studENV/shared/dist/filters/rcp-exception.filter";

@Injectable()
export class AuthorizationService {

    private readonly logger = new Logger(AuthorizationService.name);

    constructor(
        @Inject("NATS_SERVICE")
        private readonly natsClient: ClientProxy,
        private readonly tokenService: TokenService,
    ) {}

    async registration(registrationInput: RegistrationInput): Promise<AuthenticationOutput>
    {
        try {
            const user = await firstValueFrom(
                this.natsClient.send({ cmd: "getUserByEmail" }, registrationInput.email)
            );
            this.logger.log(JSON.stringify({ user }), AuthorizationService.name);

            if (user) throw new BadRequestException("User already exists");

            const hashedPassword = await bcrypt.hash(registrationInput.password, 5);
            const createdUser = await firstValueFrom(
                this.natsClient.send({ cmd: "createUser" }, {
                    ...registrationInput,
                    password: hashedPassword
                })
            );
            
            const generatedToken = await this.tokenService.generateToken(createdUser);
            return { user: createdUser, token: generatedToken };
        } catch (error) {
            if (error instanceof BadRequestException) {
                await this.natsClient.emit("error-topic", {
                    statusCode: 400,
                    message: error.message
                }).toPromise();
                throw error;
            }

            await (this.natsClient.emit('error-topic', {
                statusCode: 500,
                message: 'Internal Server Error',
            })).toPromise();
            throw new MSRpcExceptionFilter();
        }
    }
    
    async login(loginInput: LoginInput): Promise<AuthenticationOutput>
    {
        try {
            const user = await firstValueFrom(
                this.natsClient.send({ cmd: "getUserByEmail" }, loginInput.email)
            );
            if (!user) throw new NotFoundException("User not found");
            
            const validatePasswords = await bcrypt.compare(loginInput.password, user.password);
            if (!validatePasswords) throw new BadRequestException("Passwords do not match");
            
            const generatedToken = await this.tokenService.generateToken(user);
            return { user: user, token: generatedToken }
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException(error.message);
        }
    }

    async deleteAccount(userId: string): Promise<DeleteResult>
    {
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
    
}