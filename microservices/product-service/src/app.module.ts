import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ProductController } from './product/product.controller';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }), PrismaModule],
  controllers: [ProductController],
  providers: [],
})
export class AppModule {}
