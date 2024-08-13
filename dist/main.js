"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const microservices_1 = require("@nestjs/microservices");
const dotenv = require("dotenv");
dotenv.config();
async function bootstrap() {
    console.log("Authorization microservice is running...");
    const app = await core_1.NestFactory.createMicroservice(app_module_1.AppModule, {
        transport: microservices_1.Transport.NATS,
        options: {
            servers: ['nats://localhost:4222'],
        }
    });
    await app.listen()
        .then(() => console.log("Authorization microservice has successfully started!"))
        .catch(error => console.error("Error starting authorization microservice: ", error));
}
bootstrap();
//# sourceMappingURL=main.js.map