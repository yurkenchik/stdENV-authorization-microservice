import {HttpException, Injectable, InternalServerErrorException} from "@nestjs/common";
import {GraphQLException} from "@nestjs/graphql/dist/exceptions";
import {JwtService} from "@nestjs/jwt";
import {User} from "@studENV/shared/dist/entities/user.entity";

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
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException(error.message);
        }
        
    }
    
}