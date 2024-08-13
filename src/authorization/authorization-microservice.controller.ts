import {ClientProxy, MessagePattern, Payload} from "@nestjs/microservices";
import {Controller, Inject} from "@nestjs/common";
import {AuthorizationService} from "./authorization.service";
import {RegistrationInput} from "./inputs/registration.input";
import {LoginInput} from "./inputs/login.input";
import {AuthenticationOutput} from "./outputs/authentication.output";

@Controller()
export class AuthorizationMicroserviceController {
    
    constructor(
        @Inject("NATS_SERVICE")
        private readonly natsClient: ClientProxy,
        private readonly authorizationService: AuthorizationService,
    ) {}
    
    @MessagePattern({ cmd: "registration" })
    async registration(@Payload() registrationInput: RegistrationInput): Promise<AuthenticationOutput>
    {
        this.natsClient.send({ cmd: "registration" }, registrationInput);
        console.log(registrationInput);
        return this.authorizationService.registration(registrationInput);
    }
    
    @MessagePattern({ cmd: "login" })
    async login(@Payload() loginInput: LoginInput): Promise<AuthenticationOutput>
    {
        this.natsClient.send({ cmd: "login" }, loginInput);
        console.log(loginInput);
        return this.authorizationService.login(loginInput);
    }
    
}