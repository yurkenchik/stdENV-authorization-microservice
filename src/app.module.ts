import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import * as process from "node:process";
import * as dotenv from "dotenv";
import {JwtModule} from "@nestjs/jwt";
import {AuthorizationModule} from "./authorization/authorization.module";
import {ClientsModule, Transport} from "@nestjs/microservices";
import {dataSourceOptions} from "@studENV/shared/dist/typeorm/typeorm.config";
import {DataSourceOptions} from "typeorm";
import { APP_FILTER } from '@nestjs/core';
import { MSRpcExceptionFilter } from '@studENV/shared/dist/filters/rcp-exception.filter';
dotenv.config();

@Module({
  imports: [
      TypeOrmModule.forRoot(dataSourceOptions as DataSourceOptions),
      JwtModule.register({
          secret: process.env.JWT_SECRET_KEY || "secret",
      }),
      AuthorizationModule,
      ClientsModule.register([
          {
              name: 'NATS_SERVICE',
              transport: Transport.NATS,
              options: {
                  url: 'nats://localhost:4222', // Make sure this is correct
              },
          },
      ]),
  ],
  controllers: [],
  providers: [
    {
        provide: APP_FILTER,
        useClass: MSRpcExceptionFilter
    }
  ],
  exports: [TypeOrmModule, JwtModule, ClientsModule]
})
export class AppModule {}
