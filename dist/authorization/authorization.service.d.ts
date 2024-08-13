import { RegistrationInput } from "./inputs/registration.input";
import { UserService } from "../user/user.service";
import { LoginInput } from "./inputs/login.input";
import { TokenService } from "../token/token.service";
import { AuthenticationOutput } from "./outputs/authentication.output";
export declare class AuthorizationService {
    private readonly userService;
    private readonly tokenService;
    constructor(userService: UserService, tokenService: TokenService);
    registration(registrationInput: RegistrationInput): Promise<AuthenticationOutput>;
    login(loginInput: LoginInput): Promise<AuthenticationOutput>;
}
