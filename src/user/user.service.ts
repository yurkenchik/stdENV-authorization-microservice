import {BadRequestException, Injectable, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {InsertResult, Repository} from "typeorm";
import {CreateUserInput} from "./inputs/create-user.input";
import {GraphQLException} from "@nestjs/graphql/dist/exceptions";
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
                .values({
                    ...createUserInput
                })
                .returning('*')
                .execute();
            
            const userId = userInsertResult.identifiers[0].id;
            const user = await this.getUserById(userId);
            console.log("USER: ", user);
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
            
            return user || null;
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