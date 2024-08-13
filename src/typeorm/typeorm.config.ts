import * as dotenv from "dotenv"
import * as process from "node:process";
import { DataSource, DataSourceOptions } from "typeorm";
import {User} from "../entities/user.entity";
dotenv.config()

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: String(process.env.DB_PASSWORD),
    database: process.env.DB_NAME,
    entities: [User],
    migrations: [__dirname + process.env.MIGRATIONS],
    synchronize: true,
}

const dataSource = new DataSource(dataSourceOptions)
export default dataSource;