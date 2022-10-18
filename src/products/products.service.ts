import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Products } from '@prisma/client';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductQuantityDto } from './dto/update-product-quantity.dto';
import { ProductsRepository } from './product.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  getProducts(): Promise<Products[]> {
    try {
      // Retorna todos os produtos
      return this.productsRepository.findAll();
    } catch {
      throw new InternalServerErrorException();
    }
  }

  getUniqueProductById(id: string): Promise<Products> {
    try {
      // Retorna um produto específico pelo ID
      return this.productsRepository.findByUnique({ id });
    } catch {
      throw new InternalServerErrorException();
    }
  }

  getUniqueProductByName(name: string): Promise<Products> {
    try {
      // Retorna um produto específico pelo nome
      return this.productsRepository.findByUnique({ name });
    } catch {
      throw new InternalServerErrorException();
    }
  }

  async createProduct(input: CreateProductDto): Promise<Products> {
    const product = await this.productsRepository.findByUnique({
      name: input.name,
    });

    if (product) {
      throw new BadRequestException('Name already exists');
    }

    try {
      // Retorna o produto criado
      return this.productsRepository.create(input);
    } catch {
      throw new InternalServerErrorException();
    }
  }

  async updateProduct(
    id: string,
    input: UpdateProductQuantityDto,
  ): Promise<Products> {
    const product = await this.productsRepository.findByUnique({
      id,
    });

    if (!product) {
      throw new NotFoundException(`Product not found by id ${id}`);
    }

    try {
      // Retorna o produto atualizado
      const newStockQuantity = product.qty_stock - input.quantity;

      if (newStockQuantity < 0) {
        throw new BadRequestException(
          'The stock quantity of this product is equals to 0.',
        );
      }

      return this.productsRepository.update(id, {
        qty_stock: newStockQuantity,
      });
    } catch {
      throw new InternalServerErrorException();
    }
  }

  async delete(id: string): Promise<Products> {
    const product = await this.productsRepository.findByUnique({
      id,
    });

    if (!product) {
      throw new NotFoundException(`Product not found by id ${id}`);
    }
    try {
      // Retorna o produto deletado
      return this.productsRepository.delete(id);
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
