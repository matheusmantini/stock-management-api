import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ItemsListService } from 'src/items-list/items-list.service';
import { ProductsService } from 'src/products/products.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, ItemsListService, ProductsService],
  imports: [PrismaModule],
})
export class OrdersModule {}
