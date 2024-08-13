"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationModule = void 0;
const common_1 = require("@nestjs/common");
const authorization_microservice_controller_1 = require("./authorization-microservice.controller");
const authorization_service_1 = require("./authorization.service");
const user_module_1 = require("../user/user.module");
const nats_client_module_1 = require("../nats-client/nats-client.module");
let AuthorizationModule = class AuthorizationModule {
};
exports.AuthorizationModule = AuthorizationModule;
exports.AuthorizationModule = AuthorizationModule = __decorate([
    (0, common_1.Module)({
        controllers: [authorization_microservice_controller_1.AuthorizationMicroserviceController],
        providers: [authorization_service_1.AuthorizationService],
        imports: [user_module_1.UserModule, nats_client_module_1.NatsClientModule],
        exports: [authorization_service_1.AuthorizationService]
    })
], AuthorizationModule);
//# sourceMappingURL=authorization.module.js.map