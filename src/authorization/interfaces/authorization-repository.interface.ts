import {RegistrationInput} from "@studENV/shared/dist/inputs/authorization/registration.input";
import {User} from "@studENV/shared/dist/entities/user.entity";
import {LoginInput} from "@studENV/shared/dist/inputs/authorization/login.input";
import {AuthenticationOutput} from "@studENV/shared/dist/outputs/authoirization/authentication.output";
import {DeleteResult} from "typeorm";

export interface IAuthorizationRepository {
    registration(registrationInput: RegistrationInput): Promise<User>;
    login(loginInput: LoginInput): Promise<AuthenticationOutput>;
    deleteAccount(useId: string): Promise<DeleteResult>;
    verifyUserAccountViaEmail(email: string, verificationCode: string): Promise<AuthenticationOutput>;
}