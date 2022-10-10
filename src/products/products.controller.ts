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
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    if (createProductDto.price <= 0 || createProductDto.qty_stock <= 0) {
      throw new BadRequestException(
        'Price and quantity in stock must be higher than 0',
      );
    }
    const product = await this.productsService.findOneByName(
      createProductDto.name,
    );
    if (product.length !== 0) {
      throw new BadRequestException('Name already exists');
    }
    return await this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.productsService.findOneById(id);

    if (!product) {
      throw new NotFoundException(`product with id '${id}' not found`);
    }

    return product;
  }

  @Get('/stock/unavailable')
  async findProductsWithoutStock() {
    const products = await this.productsService.findProductsWithoutStock();

    if (products.length === 0) {
      throw new NotFoundException('There is no product with stock unavailable');
    }

    return products;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const product = await this.productsService.findOneById(id);

    if (!product) {
      throw new NotFoundException(`product with id '${id}' not found`);
    }

    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const product = await this.productsService.findOneById(id);
    if (!product) {
      throw new NotFoundException(`product with id '${id}' not found`);
    }

    return this.productsService.remove(id);
  }
}
