import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import * as process from "node:process";
import * as dotenv from "dotenv";
import {JwtModule} from "@nestjs/jwt";
import {dataSourceOptions} from "./typeorm/typeorm.config";
import {AuthorizationModule} from "./authorization/authorization.module";
dotenv.config();

@Module({
  imports: [
      TypeOrmModule.forRoot(dataSourceOptions),
      JwtModule.register({
          secret: process.env.JWT_SECRET_KEY || "secret",
      }),
      AuthorizationModule
  ],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule, JwtModule]
})
export class AppModule {}
