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
  async findAll() {
    const allProducts = await this.productsService.findAll();
    return allProducts.sort((currentProduct, nextProduct) => {
      return ('' + currentProduct.name.toLowerCase()).localeCompare(
        nextProduct.name.toLowerCase(),
      );
    });
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
    @Body() updateProductQuantityDto: UpdateProductQuantityDto,
  ) {
    const product = await this.productsService.findOneById(id);

    if (!product) {
      throw new NotFoundException(`product with id '${id}' not found`);
    }
    const newStockQuantity =
      product.qty_stock - updateProductQuantityDto.quantity;

    if (newStockQuantity <= 0) {
      throw new BadRequestException(
        `A quantidade em estoque do produto informado é igual a 0.`,
      );
    }

    return this.productsService.update(id, { qty_stock: newStockQuantity });
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
