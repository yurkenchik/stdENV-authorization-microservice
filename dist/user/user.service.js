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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const exceptions_1 = require("@nestjs/graphql/dist/exceptions");
const user_entity_1 = require("../entities/user.entity");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async createUser(createUserInput) {
        try {
            const userInsertResult = await this.userRepository
                .createQueryBuilder()
                .insert()
                .into(user_entity_1.User)
                .values(createUserInput)
                .execute();
            const user = userInsertResult.raw[0];
            if (!user)
                throw new exceptions_1.GraphQLException("Failed to create a user", { extensions: user });
            return user;
        }
        catch (error) {
            if (error instanceof exceptions_1.GraphQLException) {
                throw error;
            }
            throw new exceptions_1.GraphQLException(error.message, { extensions: error });
        }
    }
    async getUserById(userId) {
        try {
            const user = await this.userRepository
                .createQueryBuilder()
                .where("id = :id", { id: userId })
                .getOne();
            if (!user)
                throw new exceptions_1.GraphQLException("User not found", null);
            return user;
        }
        catch (error) {
            if (error instanceof exceptions_1.GraphQLException) {
                throw error;
            }
            throw new exceptions_1.GraphQLException(error.message, { extensions: error });
        }
    }
    async getUserByEmail(userEmail) {
        try {
            const user = await this.userRepository
                .createQueryBuilder()
                .where("email = :email", { email: userEmail })
                .getOne();
            if (!user)
                throw new exceptions_1.GraphQLException("User not found", null);
            return user;
        }
        catch (error) {
            if (error instanceof exceptions_1.GraphQLException) {
                throw error;
            }
            throw new exceptions_1.GraphQLException(error.message, { extensions: error });
        }
    }
    async getUserByUsername(username) {
        try {
            const user = await this.userRepository
                .createQueryBuilder()
                .where("username = :username", { username: username })
                .getOne();
            if (!user)
                throw new exceptions_1.GraphQLException("User not found", null);
            return user;
        }
        catch (error) {
            if (error instanceof exceptions_1.GraphQLException) {
                throw error;
            }
            throw new exceptions_1.GraphQLException(error.message, { extensions: error });
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map