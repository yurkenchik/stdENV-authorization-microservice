import { Repository } from "typeorm";
import { CreateUserInput } from "./inputs/create-user.input";
import { User } from "../entities/user.entity";
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    createUser(createUserInput: CreateUserInput): Promise<User>;
    getUserById(userId: string): Promise<User>;
    getUserByEmail(userEmail: string): Promise<User>;
    getUserByUsername(username: string): Promise<User>;
}
