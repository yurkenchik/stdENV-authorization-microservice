import {BadRequestException, HttpException, Injectable, InternalServerErrorException} from "@nestjs/common";
import {RegistrationInput} from "./inputs/registration.input";
import {GraphQLException} from "@nestjs/graphql/dist/exceptions";
import {UserService} from "../user/user.service";
import * as bcrypt from "bcrypt";
import {LoginInput} from "./inputs/login.input";
import {TokenService} from "../token/token.service";
import {AuthenticationOutput} from "./outputs/authentication.output";

@Injectable()
export class AuthorizationService {
    
    constructor(
        private readonly userService: UserService,
        private readonly tokenService: TokenService,
    ) {}
    
    async registration(registrationInput: RegistrationInput): Promise<AuthenticationOutput>
    {
        try {
            const user = await this.userService.getUserByEmail(registrationInput.email);
            if (user) throw new BadRequestException("User already exists", null);
            
            const hashedPassword = await bcrypt.hash(user.password, 5);
            const createdUser = await this.userService.createUser({
                ...registrationInput,
                password: hashedPassword,
            });
            
            const generatedToken = await this.tokenService.generateToken(createdUser);
            return { user: createdUser, token: generatedToken };
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException(error.message);
        }
    }
    
    async login(loginInput: LoginInput): Promise<AuthenticationOutput>
    {
        try {
            const user = await this.userService.getUserByEmail(loginInput.email);
            if (user) throw new BadRequestException("User already exists", null);
            
            const validatePasswords = await bcrypt.compare(loginInput.password, user.password);
            if (!validatePasswords) throw new GraphQLException("Passwords do not match", null);
            
            const generatedToken = await this.tokenService.generateToken(user);
            return { user: user, token: generatedToken }
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException(error.message);
        }
    }
    
}