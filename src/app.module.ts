import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { ItemsListModule } from './items-list/items-list.module';

@Module({
  imports: [PrismaModule, ItemsListModule, OrdersModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
