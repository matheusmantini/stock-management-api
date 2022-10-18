import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.products.findMany();
  }

  findByUnique(product: Prisma.ProductsWhereUniqueInput) {
    return this.prismaService.products.findUnique({ where: product });
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
