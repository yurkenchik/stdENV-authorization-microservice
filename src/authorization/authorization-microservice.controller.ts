import {ClientProxy, EventPattern, MessagePattern, Payload} from "@nestjs/microservices";
import {Controller, HttpException, Inject, InternalServerErrorException, Logger, UseFilters} from "@nestjs/common";
import {AuthorizationService} from "./authorization.service";
import {RegistrationInput} from "./inputs/registration.input";
import {LoginInput} from "./inputs/login.input";
import {AuthenticationOutput} from "./outputs/authentication.output";
import { DeleteResult } from "typeorm";
import { RpcExceptionFilter } from "@studENV/shared/dist/filters/rcp-exception.filter";

@Controller()
@UseFilters(RpcExceptionFilter)
export class AuthorizationMicroserviceController {
    
    private readonly logger = new Logger(AuthorizationMicroserviceController.name);
    
    constructor(
        private readonly authorizationService: AuthorizationService,
    ) {}
    
    @MessagePattern({ cmd: "registration" })
    async registration(@Payload() registrationInput: RegistrationInput): Promise<AuthenticationOutput>
    {
        return await this.authorizationService.registration(registrationInput);
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
    
    @MessagePattern({ cmd: "getTestMessage" })
    async getTestMessage(@Payload() data: string): Promise<string>
    {
        return data;
    }
    
}