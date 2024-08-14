import {Module} from "@nestjs/common";
import {UserService} from "./user.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserMicroserviceResolver} from "./user-microservice.controller";
import {User} from "../entities/user.entity";

@Module({
    providers: [UserService, UserMicroserviceResolver],
    imports: [
        TypeOrmModule.forFeature([User]),
    ],
    exports: []
})
export class UserModule {}