import {EventPattern, MessagePattern, Payload} from "@nestjs/microservices";
import {Controller, HttpException, Inject, InternalServerErrorException, Logger} from "@nestjs/common";
import {AuthorizationService} from "./authorization.service";
import {LoginInput} from "@studENV/shared/dist/inputs/authorization/login.input";
import {AuthenticationOutput} from "@studENV/shared/dist/outputs/authoirization/authentication.output";
import { DeleteResult } from "typeorm";
import {RegistrationInput} from "@studENV/shared/dist/inputs/authorization/registration.input";
import {User} from "@studENV/shared/dist/entities/user.entity";

@Controller()
export class AuthorizationMicroserviceController {
    
    constructor(
        private readonly authorizationService: AuthorizationService,
    ) {}

    @MessagePattern({ cmd: "registration" })
    async registration(@Payload() registrationInput: RegistrationInput): Promise<User> {
        return this.authorizationService.registration(registrationInput);
    }

    @MessagePattern({ cmd: "login" })
    async login(@Payload() loginInput: LoginInput): Promise<AuthenticationOutput> {
        return this.authorizationService.login(loginInput);
    }

    @MessagePattern({ cmd: "deleteAccount" })
    async deleteAccount(@Payload() userId: string): Promise<DeleteResult> {
        return await this.authorizationService.deleteAccount(userId);
    }

    @EventPattern("error-topic")
    async handleErrorException(@Payload() errorData: { statusCode: number, message: string }) {
        const { message, statusCode } = errorData;
        throw new HttpException(message, statusCode);
    }

    @MessagePattern({ cmd: "verifyUserAccountViaEmail" })
    async verifyUserAccountViaEmail(@Payload() payload: {
        email: string,
        verificationCode: string
    }): Promise<AuthenticationOutput> {
        const { email, verificationCode } = payload;
        return await this.authorizationService.verifyUserAccountViaEmail(email, verificationCode);
    }
    
}