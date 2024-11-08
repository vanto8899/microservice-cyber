import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { Logger } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

async function bootstrap() {

  const logger = WinstonModule.createLogger({
    defaultMeta: { service: "Order services" },
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
      // url kết nối đến server RabbitMQ
      urls: [process.env.MICRO_HOST],
      // tên queue xử lý
      queue: 'order_queue',
      queueOptions: {
        // chế độ lưu trữ:
        // true: save - false not save, khi RabbitMQ restart
        durable: false
      }

    }
  });

  await app.listen();
  Logger.error("")
}
bootstrap();
