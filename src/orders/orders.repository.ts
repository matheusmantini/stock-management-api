import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrdersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.orders.findMany();
  }

  findByUnique(order: Prisma.OrdersWhereUniqueInput) {
    return this.prismaService.orders.findUnique({ where: order });
  }

  create(order: Prisma.OrdersCreateInput) {
    return this.prismaService.orders.create({ data: order });
  }

  update(id: string, order: Prisma.OrdersUpdateInput) {
    return this.prismaService.orders.update({
      where: { id },
      data: order,
    });
  }
}
