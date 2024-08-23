import {BadRequestException, HttpException, Inject, Injectable, InternalServerErrorException, Logger} from "@nestjs/common";
import {RegistrationInput} from "./inputs/registration.input";
import * as bcrypt from "bcrypt";
import {LoginInput} from "./inputs/login.input";
import {TokenService} from "../token/token.service";
import {AuthenticationOutput} from "./outputs/authentication.output";
import {ClientProxy} from "@nestjs/microservices";
import {firstValueFrom} from "rxjs";
import { DeleteResult } from "typeorm";

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
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException(error.message);
        }
    }
    
    async login(loginInput: LoginInput): Promise<AuthenticationOutput>
    {
        try {
            const user = await firstValueFrom(
                this.natsClient.send({ cmd: "getUserByEmail" }, loginInput.email)
            );
            if (!user) throw new BadRequestException("User already exists");
            
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