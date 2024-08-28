import {Module} from "@nestjs/common";
import {AuthorizationMicroserviceController} from "./authorization-microservice.controller";
import {AuthorizationService} from "./authorization.service";
import {TokenModule} from "../token/token.module";
import {ClientsModule} from "@nestjs/microservices";
import {NatsClientModule} from "@studENV/shared/dist/nats-client/nats-client.module";
import {HttpModule} from "@nestjs/axios";

@Module({
    controllers: [AuthorizationMicroserviceController],
    providers: [AuthorizationService],
    imports: [
        TokenModule,
        NatsClientModule,
        HttpModule
    ],
    exports: [AuthorizationService]
})
export class AuthorizationModule {}