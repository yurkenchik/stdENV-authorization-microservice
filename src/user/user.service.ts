import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CreateUserInput} from "./inputs/create-user.input";
import {GraphQLException} from "@nestjs/graphql/dist/exceptions";
import {Source} from "graphql/language";
import {User} from "../entities/user.entity";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}
    
    async createUser(createUserInput: CreateUserInput): Promise<User>
    {
        try {
            const userInsertResult = await this.userRepository
                .createQueryBuilder()
                .insert()
                .into(User)
                .values(createUserInput)
                .execute();
            
            const user = userInsertResult.raw[0];
            if (!user) throw new GraphQLException("Failed to create a user", { extensions: user })
            
            return user;
        } catch (error) {
            if (error instanceof GraphQLException) {
                throw error;
            }
            throw new GraphQLException(error.message, { extensions: error });
        }
    }
    
    async getUserById(userId: string): Promise<User>
    {
        try {
            const user = await this.userRepository
                .createQueryBuilder()
                .where("id = :id", { id: userId })
                .getOne();
            
            if (!user) throw new GraphQLException("User not found", null)
            
            return user;
        } catch (error) {
            if (error instanceof GraphQLException) {
                throw error;
            }
            throw new GraphQLException(error.message, { extensions: error });
        }
    }
    
    async getUserByEmail(userEmail: string): Promise<User>
    {
        try {
            const user = await this.userRepository
                .createQueryBuilder()
                .where("email = :email", { email: userEmail })
                .getOne();
            
            if (!user) throw new GraphQLException("User not found", null)
            
            return user;
        } catch (error) {
            if (error instanceof GraphQLException) {
                throw error;
            }
            throw new GraphQLException(error.message, { extensions: error });
        }
    }
    
    async getUserByUsername(username: string): Promise<User>
    {
        try {
            const user = await this.userRepository
                .createQueryBuilder()
                .where("username = :username", { username: username })
                .getOne();
            
            if (!user) throw new GraphQLException("User not found", null)
            
            return user;
        } catch (error) {
            if (error instanceof GraphQLException) {
                throw error;
            }
            throw new GraphQLException(error.message, { extensions: error });
        }
    }
    
}