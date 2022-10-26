import { Module } from '@nestjs/common';
import { ItemsListService } from './items-list.service';
import { ItemsListController } from './items-list.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProductsService } from 'src/products/products.service';
import { ProductsModule } from 'src/products/products.module';
import { ProductsRepository } from 'src/products/products.repository';
import { ItemsListRepository } from './items-list.repository';

@Module({
  controllers: [ItemsListController],
  providers: [ItemsListService, ItemsListRepository, ProductsService, ProductsRepository],
  imports: [PrismaModule, ProductsModule],
})
export class ItemsListModule {}
