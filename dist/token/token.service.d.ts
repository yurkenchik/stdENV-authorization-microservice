import { JwtService } from "@nestjs/jwt";
import { User } from "../entities/user.entity";
export declare class TokenService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    generateToken(userData: User): Promise<string>;
}
