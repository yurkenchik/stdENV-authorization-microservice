"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationMicroserviceController = void 0;
const microservices_1 = require("@nestjs/microservices");
const common_1 = require("@nestjs/common");
const authorization_service_1 = require("./authorization.service");
const registration_input_1 = require("./inputs/registration.input");
const login_input_1 = require("./inputs/login.input");
let AuthorizationMicroserviceController = class AuthorizationMicroserviceController {
    constructor(natsClient, authorizationService) {
        this.natsClient = natsClient;
        this.authorizationService = authorizationService;
    }
    async registration(registrationInput) {
        this.natsClient.send({ cmd: "registration" }, registrationInput);
        console.log(registrationInput);
        return this.authorizationService.registration(registrationInput);
    }
    async login(loginInput) {
        this.natsClient.send({ cmd: "login" }, loginInput);
        console.log(loginInput);
        return this.authorizationService.login(loginInput);
    }
};
exports.AuthorizationMicroserviceController = AuthorizationMicroserviceController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: "registration" }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [registration_input_1.RegistrationInput]),
    __metadata("design:returntype", Promise)
], AuthorizationMicroserviceController.prototype, "registration", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: "login" }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_input_1.LoginInput]),
    __metadata("design:returntype", Promise)
], AuthorizationMicroserviceController.prototype, "login", null);
exports.AuthorizationMicroserviceController = AuthorizationMicroserviceController = __decorate([
    (0, common_1.Controller)(),
    __param(0, (0, common_1.Inject)("NATS_SERVICE")),
    __metadata("design:paramtypes", [microservices_1.ClientProxy,
        authorization_service_1.AuthorizationService])
], AuthorizationMicroserviceController);
//# sourceMappingURL=authorization-microservice.controller.js.map