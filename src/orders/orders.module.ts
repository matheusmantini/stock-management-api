import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ItemsListService } from 'src/items-list/items-list.service';
import { ProductsService } from 'src/products/products.service';
import { ProductsRepository } from 'src/products/product.repository';
import { ItemsListRepository } from 'src/items-list/items-list.repository';
import { OrdersRepository } from './orders.repository';

@Module({
  controllers: [OrdersController],
  providers: [
    OrdersService,
    OrdersRepository,
    ItemsListService,
    ItemsListRepository,
    ProductsService,
    ProductsRepository,
  ],
  imports: [PrismaModule],
})
export class OrdersModule {}
