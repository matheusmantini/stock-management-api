import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.products.findMany();
  }

  findByUniqueId(id: string) {
    return this.prismaService.products.findFirst({
      where: { id },
    });
  }

  findByUniqueName(name: string) {
    return this.prismaService.products.findFirst({
      where: { name },
    });
  }

  create(product: Prisma.ProductsCreateInput) {
    return this.prismaService.products.create({ data: product });
  }

  update(id: string, product: Prisma.ProductsUpdateInput) {
    return this.prismaService.products.update({
      where: { id },
      data: product,
    });
  }

  delete(id: string) {
    return this.prismaService.products.delete({ where: { id } });
  }
}
