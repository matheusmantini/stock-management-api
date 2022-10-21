import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { ItemsListModule } from './items-list/items-list.module';

@Module({
  imports: [PrismaModule, ItemsListModule, OrdersModule, ProductsModule],
})
export class AppModule {}
