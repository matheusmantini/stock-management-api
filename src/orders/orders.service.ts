import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Orders } from '@prisma/client';
import { ItemsListService } from 'src/items-list/items-list.service';
import { ProductsService } from 'src/products/products.service';
import { CreateOrderDto, UpdateOrderDto } from './dto';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private itemsListService: ItemsListService,
    private productsService: ProductsService,
  ) {}

  async getOrders(): Promise<Orders[]> {
    const showAllOrders = await this.ordersRepository.findAll();
    const allOrders = [];

    for (let i = 0; i < showAllOrders.length; i++) {
      const order = showAllOrders[i];
      const shoppingList = [];
      let totalAmount = 0;

      for (let j = 0; j < order.items_list_id.length; j++) {
        const orderItem = await this.itemsListService.getUniqueItemsListById(
          order.items_list_id[j],
        );
        const itemList = await this.productsService.getUniqueProductById(
          orderItem.product_id,
        );
        if (order.items_list_id.includes(orderItem.item_list_id)) {
          const shoppingItem = {
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
    try {
      // Retorna todos os pedidos
      return allOrders;
    } catch {
      throw new InternalServerErrorException();
    }
  }

  getUniqueOrderById(id: string): Promise<Orders> {
    return this.ordersRepository.findByUnique({ id });
  }

  async createOrder(order: CreateOrderDto): Promise<Orders> {
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

      const itemList = await this.productsService.getUniqueProductById(
        orderItem.product_id,
      );
      totalAmountOrder += itemList.price * orderItem.quantity;
    }
    order.total_amount = totalAmountOrder;
    return this.ordersRepository.create(order);
  }

  updateOrder(id: string, order: UpdateOrderDto): Promise<Orders> {
    return this.ordersRepository.update(id, order);
  }
}
