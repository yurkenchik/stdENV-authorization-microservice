import { User } from "../../entities/user.entity";
export declare class AuthenticationOutput {
    readonly user: User;
    readonly token: string;
}
