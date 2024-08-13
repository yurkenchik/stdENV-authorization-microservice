import {Field, InputType} from "@nestjs/graphql";
import {IsEmail, IsNotEmpty, IsString, Length} from "class-validator";

@InputType()
export class LoginInput {
    
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @Field()
    readonly email: string;
    
    @IsNotEmpty()
    @IsString()
    @Length(8, 125)
    @Field()
    readonly password: string;
    
}