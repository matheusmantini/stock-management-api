import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  create(createProductDto: CreateProductDto) {
    return this.prisma.products.create({ data: createProductDto });
  }

  findAll() {
    return this.prisma.products.findMany();
  }

  findOneById(id: string) {
    return this.prisma.products.findUnique({ where: { id } });
  }

  findOneByName(name: string) {
    return this.prisma.products.findMany({ where: { name } });
  }

  findProductsWithoutStock() {
    return this.prisma.products.findMany({ where: { qty_stock: { lt: 1 } } });
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.prisma.products.update({
      where: { id },
      data: updateProductDto,
    });
  }

  remove(id: string) {
    return this.prisma.products.delete({ where: { id } });
  }
}
