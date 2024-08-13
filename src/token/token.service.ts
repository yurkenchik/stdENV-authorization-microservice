import {Injectable} from "@nestjs/common";
import {GraphQLException} from "@nestjs/graphql/dist/exceptions";
import {JwtService} from "@nestjs/jwt";
import {User} from "../entities/user.entity";

@Injectable()
export class TokenService {
    
    constructor(
        private readonly jwtService: JwtService,
    ) {}
    
    async generateToken(userData: User): Promise<string>
    {
        try {
            const tokenPayload = {
                id: userData.id,
                firstname: userData.firstname,
                lastname: userData.lastname,
                email: userData.email,
                age: userData.age
            }
            
            return this.jwtService.sign(tokenPayload);
        } catch (error) {
            if (error instanceof GraphQLException) {
                throw error;
            }
            throw new GraphQLException(error.message, { extensions: error });
        }
        
    }
    
}