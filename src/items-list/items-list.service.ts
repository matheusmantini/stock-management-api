import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ItemList } from '@prisma/client';
import { ProductsService } from 'src/products/products.service';
import { CreateItemListDto, UpdateItemListDto } from './dto';
import { IItemListComplete } from './items-list-complete.structure';
import { ItemsListRepository } from './items-list.repository';

@Injectable()
export class ItemsListService {
  constructor(
    private readonly itemsListRepository: ItemsListRepository,
    private readonly productsService: ProductsService,
  ) {}

  async getItemsList(): Promise<ItemList[]> {
    const newItemsList = [];
    const allItemsList = await this.itemsListRepository.findAll();

    for (let i = 0; i < allItemsList.length; i++) {
      const newItem = await this.getUniqueItemsListById(allItemsList[i].id);
      newItemsList.push(newItem);
    }

    try {
      // Retorna todos os itemsList
      return newItemsList;
    } catch {
      throw new InternalServerErrorException();
    }
  }

  async getUniqueItemsListById(id: string): Promise<IItemListComplete> {
    const orderItem = await this.itemsListRepository.findByUnique({ id });
    const itemList = await this.productsService.getUniqueProductById(
      orderItem.product_id,
    );

    const itemListComplete = {
      item_list_id: orderItem.id,
      product_id: orderItem.product_id,
      product_name: itemList.name,
      price: itemList.price,
      quantity: orderItem.quantity,
      total: itemList.price * orderItem.quantity,
    };
    try {
      // Retorna um ItemsList específico pelo ID com informações mais detalhadas
      return itemListComplete;
    } catch {
      throw new InternalServerErrorException();
    }
  }

  async create(itemList: CreateItemListDto) {
    const uniqueProduct = await this.productsService.getUniqueProductById(
      itemList.product_id,
    );

    if (!uniqueProduct) {
      throw new NotFoundException(
        `item not found with id '${itemList.product_id}'`,
      );
    }

    if (itemList.quantity < 1) {
      throw new BadRequestException('Quantity must be higher than 0.');
    }

    try {
      // Retorna o itemList criado
      await this.itemsListRepository.create(itemList);
    } catch {
      throw new InternalServerErrorException();
    }
  }

  async updateQuantity(id: string, itemList: UpdateItemListDto) {
    const uniqueItemList = await this.itemsListRepository.findByUnique({ id });

    if (!uniqueItemList) {
      throw new NotFoundException(`item list with id '${id}' not found`);
    }

    try {
      // Retorna o itemList atualizado
      await this.itemsListRepository.updateQuantity(id, itemList);
    } catch {
      throw new InternalServerErrorException();
    }
  }

  async delete(id: string) {
    const uniqueItemList = await this.itemsListRepository.findByUnique({ id });

    if (!uniqueItemList) {
      throw new NotFoundException(`item list with id '${id}' not found`);
    }

    try {
      // Retorna o itemList deletado
      await this.itemsListRepository.delete(id);
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
