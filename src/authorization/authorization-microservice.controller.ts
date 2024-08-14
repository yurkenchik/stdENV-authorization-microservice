import {ClientProxy, EventPattern, MessagePattern, Payload} from "@nestjs/microservices";
import {Controller, HttpException, Inject, InternalServerErrorException, Logger} from "@nestjs/common";
import {AuthorizationService} from "./authorization.service";
import {RegistrationInput} from "./inputs/registration.input";
import {LoginInput} from "./inputs/login.input";
import {AuthenticationOutput} from "./outputs/authentication.output";

@Controller()
export class AuthorizationMicroserviceController {
    
    private readonly logger = new Logger(AuthorizationMicroserviceController.name);
    
    constructor(
        private readonly authorizationService: AuthorizationService,
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
    
    @MessagePattern({ cmd: "getTestMessage" })
    async getTestMessage(@Payload() data: string): Promise<string>
    {
        return data;
    }
    
}