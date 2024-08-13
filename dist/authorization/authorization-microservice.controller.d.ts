import { ClientProxy } from "@nestjs/microservices";
import { AuthorizationService } from "./authorization.service";
import { RegistrationInput } from "./inputs/registration.input";
import { LoginInput } from "./inputs/login.input";
import { AuthenticationOutput } from "./outputs/authentication.output";
export declare class AuthorizationMicroserviceController {
    private readonly natsClient;
    private readonly authorizationService;
    constructor(natsClient: ClientProxy, authorizationService: AuthorizationService);
    registration(registrationInput: RegistrationInput): Promise<AuthenticationOutput>;
    login(loginInput: LoginInput): Promise<AuthenticationOutput>;
}
