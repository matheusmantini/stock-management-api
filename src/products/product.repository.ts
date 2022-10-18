import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.products.findMany();
  }

  findByUnique(input: Prisma.ProductsWhereUniqueInput) {
    return this.prismaService.products.findUnique({ where: input });
  }

  create(input: Prisma.ProductsCreateInput) {
    return this.prismaService.products.create({ data: input });
  }

  update(id: string, input: Prisma.ProductsUpdateInput) {
    return this.prismaService.products.update({
      where: { id },
      data: input,
    });
  }

  delete(id: string) {
    return this.prismaService.products.delete({ where: { id } });
  }
}
