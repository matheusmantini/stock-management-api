import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductQuantityDto } from './dto/update-product-quantity.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getProducts() {
    const allProducts = await this.productsService.getProducts();
    return allProducts.sort((currentProduct, nextProduct) => {
      return ('' + currentProduct.name.toLowerCase()).localeCompare(
        nextProduct.name.toLowerCase(),
      );
    });
  }

  @Get(':id')
  async getUniqueProductById(@Param('id') id: string) {
    const product = await this.productsService.getUniqueProductById(id);

    if (!product) {
      throw new NotFoundException(`product with id '${id}' not found`);
    }

    return product;
  }

  @Post()
  async createProduct(@Body() input: CreateProductDto) {
    if (input.price <= 0 || input.qty_stock <= 0) {
      throw new BadRequestException(
        'Price and quantity in stock must be higher than 0',
      );
    }

    return this.productsService.createProduct(input);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() input: UpdateProductQuantityDto,
  ) {
    return this.productsService.updateProduct(id, input);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    const product = await this.productsService.getUniqueProductById(id);
    if (!product) {
      throw new NotFoundException(`product with id '${id}' not found`);
    }

    return this.productsService.delete(id);
  }
}
