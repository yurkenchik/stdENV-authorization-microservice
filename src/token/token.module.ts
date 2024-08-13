import {Module} from "@nestjs/common";
import {JwtModule} from "@nestjs/jwt";
import {TokenService} from "./token.service";
import {NatsClientModule} from "../nats-client/nats-client.module";


@Module({
    providers: [TokenService],
    imports: [
        JwtModule,
        NatsClientModule
    ],
    exports: [JwtModule, TokenService]
})
export class TokenModule {}