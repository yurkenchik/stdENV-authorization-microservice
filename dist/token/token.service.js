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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = void 0;
const common_1 = require("@nestjs/common");
const exceptions_1 = require("@nestjs/graphql/dist/exceptions");
const jwt_1 = require("@nestjs/jwt");
let TokenService = class TokenService {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async generateToken(userData) {
        try {
            const tokenPayload = {
                id: userData.id,
                firstname: userData.firstname,
                lastname: userData.lastname,
                email: userData.email,
                age: userData.age
            };
            return this.jwtService.sign(tokenPayload);
        }
        catch (error) {
            if (error instanceof exceptions_1.GraphQLException) {
                throw error;
            }
            throw new exceptions_1.GraphQLException(error.message, { extensions: error });
        }
    }
};
exports.TokenService = TokenService;
exports.TokenService = TokenService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], TokenService);
//# sourceMappingURL=token.service.js.map