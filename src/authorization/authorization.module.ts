import {Module} from "@nestjs/common";
import {AuthorizationMicroserviceController} from "./authorization-microservice.controller";
import {AuthorizationService} from "./authorization.service";
import {UserModule} from "../user/user.module";

@Module({
    controllers: [AuthorizationMicroserviceController],
    providers: [AuthorizationService],
    imports: [UserModule],
    exports: [AuthorizationService]
})
export class AuthorizationModule {}