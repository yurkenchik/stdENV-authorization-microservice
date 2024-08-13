import {Module} from "@nestjs/common";
import {AuthorizationMicroserviceController} from "./authorization-microservice.controller";
import {AuthorizationService} from "./authorization.service";
import {UserModule} from "../user/user.module";
import {NatsClientModule} from "../nats-client/nats-client.module";

@Module({
    controllers: [AuthorizationMicroserviceController],
    providers: [AuthorizationService],
    imports: [UserModule, NatsClientModule],
    exports: [AuthorizationService]
})
export class AuthorizationModule {}