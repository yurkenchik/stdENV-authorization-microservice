import {Module} from "@nestjs/common";
import {JwtModule} from "@nestjs/jwt";
import {TokenService} from "./token.service";

@Module({
    providers: [TokenService],
    imports: [
        JwtModule,
    ],
    exports: [JwtModule, TokenService]
})
export class TokenModule {}