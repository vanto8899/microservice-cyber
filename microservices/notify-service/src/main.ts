import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { Logger } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

async function bootstrap() {
  const logger = WinstonModule.createLogger({
    defaultMeta: { service: "Notify services" },
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

  const app = await NestFactory.
  createMicroservice<MicroserviceOptions>
  (AppModule, {
    logger,
    transport: Transport.RMQ,
    options: {
      // chuyen ve some-rabbit khi docker compose
      urls: ['amqp://admin:1234@localhost:5672'],
      queue: 'notify_queue',
      queueOptions: {
        durable: false
      }

    }
  });

  await app.listen();
  Logger.error("")
}
bootstrap();
