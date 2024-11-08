import { Module } from '@nestjs/common';
import { ProductController } from './product/product.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [

    // ClientsModule.register([{
    //   name: "PRODUCT_NAME",
    //   transport: Transport.RMQ,
    //   options: {
    //     urls: ['amqp://admin:1234@localhost:5672'],
    //     queue: 'product_queue',
    //     queueOptions: {
    //       durable: false
    //     }
    //   }
    // }]),

    ClientsModule.register([{
      name: "ORDER_NAME",
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://admin:1234@localhost:5672'], // nho chuyen ve some-rabbit khi docker compose
        queue: 'order_queue',
        queueOptions: {
          durable: false
        }
      }
    }]),

    ClientsModule.register([{
      name: "NOTIFY_NAME",
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://admin:1234@localhost:5672'],// nho chuyen ve some-rabbit khi docker compose
        queue: 'notify_queue',
        queueOptions: {
          durable: false
        }
      }
    }]),

    ClientsModule.register([{
      name: "SHIPPING_NAME",
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://admin:1234@localhost:5672'],
        queue: 'shipping_queue',
        queueOptions: {
          durable: false
        }
      }
    }]),

    JwtModule.register({
      global: true
    })
  ],
  controllers: [ProductController],
  providers: [],
})
export class AppModule {}
