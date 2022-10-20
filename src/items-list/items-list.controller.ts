import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { CreateItemListDto, UpdateItemListDto } from './dto';
import { ItemsListService } from './items-list.service';

@Controller('items-list')
export class ItemsListController {
  constructor(private readonly itemsListService: ItemsListService) {}

  @Get()
  getItemsList() {
    return this.itemsListService.getItemsList();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemsListService.getUniqueItemsListById(id);
  }

  @Post()
  async create(@Body() body: CreateItemListDto) {
    await this.itemsListService.create(body);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdateItemListDto) {
    return await this.itemsListService.updateQuantity(id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.itemsListService.delete(id);
  }
}
