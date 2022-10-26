import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Products } from '@prisma/client';
import { CreateProductDto, UpdateProductQuantityDto } from './dto';
import { ProductsRepository } from './products.repository';

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
    const product = await this.productsRepository.findByUniqueId(id);

    if (product === null) {
      throw new NotFoundException(`product with id '${id}' not found`);
    }

    return product;
  }

  async createProduct(product: CreateProductDto) {
    const listedProducts = await this.productsRepository.findAll();

    for (let i = 0; i < listedProducts.length; i++) {
      if (listedProducts[i].name === product.name) {
        throw new ConflictException('Name already exists');
      }
    }

    if (product.price <= 0 || product.qty_stock <= 0) {
      throw new BadRequestException(
        'Price and quantity in stock must be higher than 0',
      );
    }
    try {
      // Retorna o produto criado
      await this.productsRepository.create(product);
    } catch {
      throw new InternalServerErrorException();
    }
  }

  handleNewQuantity(qty_stock: number, quantity: number): number {
    const newStockQuantity = qty_stock - quantity;

    if (newStockQuantity < 0) {
      throw new ConflictException(
        'The stock quantity of this product is equals to 0.',
      );
    }

    return newStockQuantity;
  }

  async updateProduct(
    id: string,
    product: UpdateProductQuantityDto,
  ): Promise<Products> {
    try {
      const uniqueProduct = await this.productsRepository.findByUniqueId(id);

      if (!uniqueProduct) {
        throw new NotFoundException(`Product not found by id ${id}`);
      }

      const newStockQuantity = this.handleNewQuantity(
        uniqueProduct.qty_stock,
        product.quantity,
      );
      // Retorna o produto atualizado
      return this.productsRepository.update(id, {
        qty_stock: newStockQuantity,
      });
    } catch {
      throw new InternalServerErrorException();
    }
  }

  async delete(id: string) {
    const uniqueProduct = await this.productsRepository.findByUniqueId(id);

    if (!uniqueProduct) {
      throw new NotFoundException(`Product not found by id ${id}`);
    }
    try {
      // Retorna o produto deletado
      await this.productsRepository.delete(id);
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
