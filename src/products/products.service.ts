import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Products } from '@prisma/client';
import { CreateProductDto, UpdateProductQuantityDto } from './dto';
import { ProductsRepository } from './product.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async getProducts(): Promise<Products[]> {
    try {
      const allProducts = await this.productsRepository.findAll();
      // Retorna todos os produtos
      return allProducts.sort((currentProduct, nextProduct) => {
        return ('' + currentProduct.name.toLowerCase()).localeCompare(
          nextProduct.name.toLowerCase(),
        );
      });
    } catch {
      throw new InternalServerErrorException();
    }
  }

  async getUniqueProductById(id: string): Promise<Products> {
    const product = await this.productsRepository.findByUnique({ id });

    if (!product) {
      throw new NotFoundException(`product with id '${id}' not found`);
    }

    try {
      // Retorna um produto específico pelo ID
      return product;
    } catch {
      throw new InternalServerErrorException();
    }
  }

  async getUniqueProductByName(name: string): Promise<Products> {
    const product = await this.productsRepository.findByUnique({ name });

    if (!product) {
      throw new NotFoundException(`product with name '${name}' not found`);
    }

    try {
      // Retorna um produto específico pelo nome
      return product;
    } catch {
      throw new InternalServerErrorException();
    }
  }

  async createProduct(input: CreateProductDto): Promise<Products> {
    const product = await this.productsRepository.findByUnique({
      name: input.name,
    });

    if (product) {
      throw new ConflictException('Name already exists');
    }

    if (input.price <= 0 || input.qty_stock <= 0) {
      throw new BadRequestException(
        'Price and quantity in stock must be higher than 0',
      );
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

    const newStockQuantity = product.qty_stock - input.quantity;

    if (newStockQuantity < 0) {
      throw new ConflictException(
        'The stock quantity of this product is equals to 0.',
      );
    }

    try {
      // Retorna o produto atualizado
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
