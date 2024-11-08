import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { Logger } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

async function bootstrap() {

  const logger = WinstonModule.createLogger({
    transports: [
    new winston.transports.Console(),
    new winston.transports.File({
    // filename: 'logs/basic.log'
    // , // File lưu trữ log
    // level: 'info'
    filename: 'logs/error.log'
    , // File lưu trữ log error
    level: 'error'
    , // Lưu log từ mức info trở lên (info, warn, error)
    }),
    ],
    });

  const app = await NestFactory.create(AppModule,{logger});

  app.use(express.static("*"))
  app.enableCors()

  await app.listen(8080);
  //Logger.log("demo log");
  Logger.error("");
}
bootstrap();
