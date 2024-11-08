import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';
import { RedisModule } from './redis/redis.module';
import { ElasticModule } from './elastic/elastic.module';
@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true
    }),
    PrismaModule,
    ProductModule,
    AuthModule,
    OrdersModule,
    RedisModule,
    ElasticModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
