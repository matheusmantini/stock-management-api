import { Controller, Get, Param, NotFoundException, Post, Body, BadRequestException, Patch, Delete } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { CreateItemListDto } from './dto/create-item-list.dto';
import { UpdateItemListDto } from './dto/update-item-list.dto';
import { ItemsListService } from './items-list.service';

@Controller('items-list')
export class ItemsListController {
  constructor(
    private readonly itemsListService: ItemsListService,
    private readonly productsService: ProductsService
  ) {}

  @Post()
  async create(@Body() createItemListDto: CreateItemListDto) {
    const product = await this.productsService.findOneById(
      createItemListDto.product_id,
    );
    if (!product) {
      throw new NotFoundException(
        `item not found with id '${createItemListDto.product_id}'`,
      );
    }
    if (createItemListDto.quantity < 1) {
      throw new BadRequestException('Quantity must be higher than 0.');
    }

    return this.itemsListService.create(createItemListDto);
  }

  @Get()
  async findAll() {
    const newAllItems = [];
    const allItems = await this.itemsListService.findAll();

    for (let i = 0; i < allItems.length; i++) {
      const newItem = await this.findOne(allItems[i].id);
      newAllItems.push(newItem);      
    }
    
    return newAllItems;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const orderItem = await this.itemsListService.findOneById(id);
    const itemList = await this.productsService.findOneById(
      orderItem.product_id,
    );

    const orderComplete = {
      item_list_id: orderItem.id,
      product_id: orderItem.product_id,
      product_name: itemList.name,
      price: itemList.price,
      quantity: orderItem.quantity,
      total: itemList.price * orderItem.quantity,
    };
    return orderComplete;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateItemListDto: UpdateItemListDto,
  ) {
    const listItem = await this.itemsListService.findOneById(id);
    if (!listItem) {
      throw new NotFoundException(`list item with id '${id}' not found`);
    }

    return this.itemsListService.updateQuantity(id, updateItemListDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const listItem = await this.itemsListService.findOneById(id);
    
    if (!listItem) {
      throw new NotFoundException(`list item with id '${id}' not found`);
    }

    return this.itemsListService.remove(id);
  }
}
