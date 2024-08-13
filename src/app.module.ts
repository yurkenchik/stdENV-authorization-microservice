import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import * as process from "node:process";
import {JwtModule} from "@nestjs/jwt";
import {dataSourceOptions} from "./typeorm/typeorm.config";

@Module({
  imports: [
      TypeOrmModule.forRoot(dataSourceOptions),
      JwtModule.register({
          secret: process.env.JWT_SECRET_KEY,
      }),
  ],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule]
})
export class AppModule {}
