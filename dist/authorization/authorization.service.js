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
exports.AuthorizationService = void 0;
const common_1 = require("@nestjs/common");
const exceptions_1 = require("@nestjs/graphql/dist/exceptions");
const user_service_1 = require("../user/user.service");
const bcrypt = require("bcrypt");
const token_service_1 = require("../token/token.service");
let AuthorizationService = class AuthorizationService {
    constructor(userService, tokenService) {
        this.userService = userService;
        this.tokenService = tokenService;
    }
    async registration(registrationInput) {
        try {
            const user = await this.userService.getUserByEmail(registrationInput.email);
            if (user)
                throw new exceptions_1.GraphQLException("User already exists", null);
            const hashedPassword = await bcrypt.hash(user.password, 5);
            const createdUser = await this.userService.createUser({
                ...registrationInput,
                password: hashedPassword,
            });
            const generatedToken = await this.tokenService.generateToken(createdUser);
            return { user: createdUser, token: generatedToken };
        }
        catch (error) {
            if (error instanceof exceptions_1.GraphQLException) {
                throw error;
            }
            throw new exceptions_1.GraphQLException(error.message, { extensions: error });
        }
    }
    async login(loginInput) {
        try {
            const user = await this.userService.getUserByEmail(loginInput.email);
            if (user)
                throw new exceptions_1.GraphQLException("User already exists", null);
            const validatePasswords = await bcrypt.compare(loginInput.password, user.password);
            if (!validatePasswords)
                throw new exceptions_1.GraphQLException("Passwords do not match", null);
            const generatedToken = await this.tokenService.generateToken(user);
            return { user: user, token: generatedToken };
        }
        catch (error) {
            if (error instanceof exceptions_1.GraphQLException) {
                throw error;
            }
            throw new exceptions_1.GraphQLException(error.message, { extensions: error });
        }
    }
};
exports.AuthorizationService = AuthorizationService;
exports.AuthorizationService = AuthorizationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        token_service_1.TokenService])
], AuthorizationService);
//# sourceMappingURL=authorization.service.js.map