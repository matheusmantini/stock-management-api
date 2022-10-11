import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ItemsListService } from 'src/items-list/items-list.service';
import { ProductsService } from 'src/products/products.service';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private itemsListService: ItemsListService,
    private productsService: ProductsService,
  ) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    let totalAmountOrder = 0;
    for (let i = 0; i < createOrderDto.items_list_id.length; i++) {

      const orderItem = await this.itemsListService.findOneById(createOrderDto.items_list_id[i]);

      if (!orderItem) {
        throw new NotFoundException(
          `item not found with id ${createOrderDto.items_list_id[i]}`,
        );
      }

      const itemList = await this.productsService.findOneById(
        orderItem.product_id,
      );
      totalAmountOrder += itemList.price * orderItem.quantity;
    }
    createOrderDto.total_amount = totalAmountOrder;
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  async findAll() {
    const showAllOrders = await this.ordersService.findAll();
    let allOrders = [];

    for (let i = 0; i < showAllOrders.length; i++) {
      const order = showAllOrders[i];
      let shoppingList = [];
      let totalAmount = 0;

      for (let j = 0; j < order.items_list_id.length; j++) {
        const orderItem = await this.itemsListService.findOneById(
          order.items_list_id[j],
        );
        const itemList = await this.productsService.findOneById(
          orderItem?.product_id,
        );
        if (order.items_list_id.includes(orderItem.id)) {
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
    return allOrders;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(id, updateOrderDto);
  }
}
