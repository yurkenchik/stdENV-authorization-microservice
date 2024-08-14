import {Module} from "@nestjs/common";
import {AuthorizationMicroserviceController} from "./authorization-microservice.controller";
import {AuthorizationService} from "./authorization.service";
import {UserModule} from "../user/user.module";
import {TokenModule} from "../token/token.module";

@Module({
    controllers: [AuthorizationMicroserviceController],
    providers: [AuthorizationService],
    imports: [UserModule, TokenModule],
    exports: [AuthorizationService]
})
export class AuthorizationModule {}