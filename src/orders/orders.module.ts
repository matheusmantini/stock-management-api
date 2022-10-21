import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { ItemsListService } from '../items-list/items-list.service';
import { ProductsService } from '../products/products.service';
import { ProductsRepository } from '../products/product.repository';
import { ItemsListRepository } from '../items-list/items-list.repository';
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
