import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Orders } from '@prisma/client';
import { ItemsListService } from '../items-list/items-list.service';
import { ProductsRepository } from '../products/products.repository';
import { CreateOrderDto, UpdateOrderDto } from './dto';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly itemsListService: ItemsListService,
    private readonly productsRepository: ProductsRepository,
  ) {}

  async getOrders(): Promise<Orders[]> {
    const allOrders = [];
    const showAllOrders = await this.ordersRepository.findAll();

    for (let i = 0; i < showAllOrders.length; i++) {
      const order = showAllOrders[i];
      const shoppingList = [];
      let totalAmount = 0;

      for (let j = 0; j < order.items_list_id.length; j++) {
        const orderItem = await this.itemsListService.getUniqueItemsListById(
          order.items_list_id[j],
        );
        console.log('orderItem', orderItem);
        const itemList = await this.productsRepository.findByUniqueId(
          orderItem.product_id,
        );
        console.log('itemList', itemList);
        if (order.items_list_id.includes(orderItem.item_list_id)) {
          const shoppingItem = {
            itemListId: orderItem.item_list_id,
            product: itemList.name,
            quantity: orderItem.quantity,
            price: itemList.price,
          };
          shoppingList.push(shoppingItem);
          totalAmount += orderItem.quantity * itemList.price;
        }
      }

      const newOrder = {
        id: order.id,
        client_name: order.client_name,
        delivery_date: order.delivery_date,
        shopping_list: shoppingList,
        total_amount: totalAmount,
      };

      allOrders.push(newOrder);
    }
    return allOrders;
  }

  async getUniqueOrderById(id: string): Promise<Partial<Orders>> {
    const uniqueOrder = await this.ordersRepository.findByUnique({ id });
    const shoppingList = [];
    let totalAmount = 0;

    for (let j = 0; j < uniqueOrder.items_list_id.length; j++) {
      const orderItem = await this.itemsListService.getUniqueItemsListById(
        uniqueOrder.items_list_id[j],
      );
      const itemList = await this.productsRepository.findByUniqueId(
        orderItem.product_id,
      );
      if (uniqueOrder.items_list_id.includes(orderItem.item_list_id)) {
        const shoppingItem = {
          itemListId: orderItem.item_list_id,
          product: itemList.name,
          quantity: orderItem.quantity,
          price: itemList.price,
        };
        shoppingList.push(shoppingItem);
        totalAmount += orderItem.quantity * itemList.price;
      }
    }

    const newOrder = {
      id: uniqueOrder.id,
      client_name: uniqueOrder.client_name,
      delivery_date: uniqueOrder.delivery_date,
      shopping_list: shoppingList,
      total_amount: totalAmount,
    };

    try {
      // Retorna um pedido específico de acordo com o ID informado
      return newOrder;
    } catch {
      throw new InternalServerErrorException();
    }
  }

  async createOrder(order: CreateOrderDto) {
    let totalAmountOrder = 0;
    for (let i = 0; i < order.items_list_id.length; i++) {
      const orderItem = await this.itemsListService.getUniqueItemsListById(
        order.items_list_id[i],
      );

      if (!orderItem) {
        throw new NotFoundException(
          `item not found with id ${order.items_list_id[i]}`,
        );
      }

      const itemList = await this.productsRepository.findByUniqueId(
        orderItem.product_id,
      );
      totalAmountOrder += itemList.price * orderItem.quantity;
    }
    order.total_amount = totalAmountOrder;
    try {
      // Retorna o pedido criado
      await this.ordersRepository.create(order);
    } catch {
      throw new InternalServerErrorException();
    }
  }

  updateOrder(id: string, order: UpdateOrderDto): Promise<Orders> {
    try {
      // Retorna o pedido alterado
      return this.ordersRepository.update(id, order);
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
