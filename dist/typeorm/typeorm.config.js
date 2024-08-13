"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSourceOptions = void 0;
const dotenv = require("dotenv");
const process = require("node:process");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../entities/user.entity");
dotenv.config();
exports.dataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: String(process.env.DB_PASSWORD),
    database: process.env.DB_NAME,
    entities: [user_entity_1.User],
    migrations: [__dirname + process.env.MIGRATIONS],
    synchronize: true,
};
const dataSource = new typeorm_1.DataSource(exports.dataSourceOptions);
exports.default = dataSource;
//# sourceMappingURL=typeorm.config.js.map