import {Resolver} from "@nestjs/graphql";
import {UserService} from "./user.service";

@Resolver()
export class UserMicroserviceResolver {
    
    constructor(
        private readonly userService: UserService
    ) {}
    
}