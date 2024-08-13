import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Field, ID, ObjectType} from "@nestjs/graphql";

@ObjectType()
@Entity()
export class User {
    
    @PrimaryGeneratedColumn("uuid")
    @Field(() => ID)
    id: string;
    
    @Field()
    @Column({ type: "varchar" })
    firstname: string;
    
    @Field()
    @Column({ type: "varchar" })
    lastname: string;
    
    @Field()
    @Column({ type: "varchar" })
    username: string;
    
    @Field()
    @Column({ type: "varchar" })
    email: string;
    
    @Field()
    @Column({ type: "varchar" })
    password: string;
    
    @Field()
    @Column({ type: "integer" })
    age: number;
    
}