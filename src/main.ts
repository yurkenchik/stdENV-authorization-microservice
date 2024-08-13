import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {MicroserviceOptions, Transport} from "@nestjs/microservices";
import * as process from "node:process";
import * as dotenv from "dotenv";
dotenv.config();

async function bootstrap(): Promise<void> {
    
    console.log("Authorization microservice is running...")
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
        transport: Transport.NATS,
        options: {
            servers: ['nats://localhost:4222'],
        }
    });
    
    await app.listen()
        .then(() => console.log("Authorization microservice has successfully started!"))
        .catch(error => console.error("Error starting authorization microservice: ", error));
    
}
bootstrap();
