import { ObjectType, Field } from '@nestjs/graphql';
import {User} from "../../entities/user.entity";

@ObjectType()
export class AuthenticationOutput {
    
    @Field(() => User)
    readonly user: User;
    
    @Field()
    readonly token: string;
}
