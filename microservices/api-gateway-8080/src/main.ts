import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { Logger } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

//API gateway
async function bootstrap() {

  const logger = WinstonModule.createLogger({
    defaultMeta: { service: "API Gateway" },
    transports: [
    new winston.transports.Http({
    host: 'localhost'
    , // Tên container Logstash hoặc IP của Logstash
    port: 5044, // Cổng kết nối với Logstash
    level: 'error'
    }),
    new winston.transports.Console(),
    ],
    });

  const app = await NestFactory.create(AppModule,{logger});
  await app.listen(8080);
  Logger.error("")
}
bootstrap();
