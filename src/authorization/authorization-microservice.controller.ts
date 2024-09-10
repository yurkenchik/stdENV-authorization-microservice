import {ClientProxy, EventPattern, MessagePattern, Payload} from "@nestjs/microservices";
import {Controller, HttpException, Inject, Logger} from "@nestjs/common";
import {AuthorizationService} from "./authorization.service";
import {LoginInput} from "@studENV/shared/dist/inputs/authorization/login.input";
import {AuthenticationOutput} from "@studENV/shared/dist/outputs/authoirization/authentication.output";
import { DeleteResult } from "typeorm";
import {HttpService} from "@nestjs/axios";
import {RegistrationInput} from "@studENV/shared/dist/inputs/authorization/registration.input";

@Controller()
export class AuthorizationMicroserviceController {
    
    private readonly logger = new Logger(AuthorizationMicroserviceController.name);
    
    constructor(
        @Inject("NATS_SERVICE")
        private readonly natsClient: ClientProxy,
        private readonly authorizationService: AuthorizationService,
        private readonly httpService: HttpService
    ) {}

    @MessagePattern({ cmd: "registration" })
    async registration(@Payload() registrationInput: RegistrationInput): Promise<AuthenticationOutput>
    {
        return this.authorizationService.registration(registrationInput);
    }

    @MessagePattern({ cmd: "login" })
    async login(@Payload() loginInput: LoginInput): Promise<AuthenticationOutput>
    {
        console.log(loginInput);
        return this.authorizationService.login(loginInput);
    }

    @MessagePattern({ cmd: "deleteAccount" })
    async deleteAccount(@Payload() userId: string): Promise<DeleteResult>
    {
        return await this.authorizationService.deleteAccount(userId);
    }

    @EventPattern("error-topic")
    async handleErrorException(@Payload() errorData: { statusCode: number, message: string })
    {
        console.log("Exception error: ", errorData);
        const { message, statusCode } = errorData;
        throw new HttpException(message, statusCode);
    }
    
}