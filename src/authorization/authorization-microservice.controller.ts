import {ClientProxy, EventPattern, MessagePattern, Payload, RpcException} from "@nestjs/microservices";
import {Controller, HttpException, Inject, InternalServerErrorException, Logger, UseFilters} from "@nestjs/common";
import {AuthorizationService} from "./authorization.service";
import {RegistrationInput} from "@studENV/shared/dist/inputs/authorization/registration.input";
import {LoginInput} from "@studENV/shared/dist/inputs/authorization/login.input";
import {AuthenticationOutput} from "@studENV/shared/dist/outputs/authoirization/authentication.output";
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
    async registration(@Payload() registationInput): Promise<AuthenticationOutput>
    {
        return this.authorizationService.registration(registationInput);
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