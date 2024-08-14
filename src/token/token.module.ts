import {Module} from "@nestjs/common";
import process from "node:process";
import {JwtModule} from "@nestjs/jwt";
import * as dotenv from "dotenv";
import {TokenService} from "./token.service";
dotenv.config();

@Module({
    providers: [TokenService],
    imports: [
        JwtModule.register({
            secret: "secret",
        }),
    ],
    exports: [JwtModule, TokenService]
})
export class TokenModule {}