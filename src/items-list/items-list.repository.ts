import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ItemsListRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.itemList.findMany();
  }

  findByUnique(itemList: Prisma.ItemListWhereUniqueInput) {
    return this.prismaService.itemList.findUnique({ where: itemList });
  }

  create(itemList: Prisma.ItemListCreateInput) {
    return this.prismaService.itemList.create({ data: itemList });
  }

  updateQuantity(id: string, itemList: Prisma.ItemListCreateInput) {
    return this.prismaService.itemList.update({
      where: { id },
      data: itemList,
    });
  }

  delete(id: string) {
    return this.prismaService.itemList.delete({ where: { id } });
  }
}
