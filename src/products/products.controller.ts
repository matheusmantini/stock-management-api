import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductQuantityDto } from './dto/update-product-quantity.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getProducts() {
    return this.productsService.getProducts();
  }

  @Get(':id')
  async getUniqueProductById(id: string) {
    return this.productsService.getUniqueProductById(id);
  }

  @Post()
  async createProduct(@Body() body: CreateProductDto) {
    return this.productsService.createProduct(body);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() body: UpdateProductQuantityDto,
  ) {
    return this.productsService.updateProduct(id, body);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return this.productsService.delete(id);
  }
}
