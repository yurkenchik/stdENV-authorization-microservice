import {Field, InputType} from "@nestjs/graphql";
import {IsEmail, IsNotEmpty, IsString, Length} from "class-validator";

@InputType()
export class RegistrationInput {
    
    @IsNotEmpty()
    @IsString()
    @Field()
    readonly firstname: string;
    
    @IsNotEmpty()
    @IsString()
    @Field()
    readonly lastname: string;
    
    @IsNotEmpty()
    @IsString()
    @Field()
    readonly username: string;
    
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