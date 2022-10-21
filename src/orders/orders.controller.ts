import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto, UpdateOrderDto } from './dto';
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  async getOrders() {
    return this.ordersService.getOrders();
  }

  @Get(':id')
  getUniqueOrderById(@Param('id') id: string) {
    return this.ordersService.getUniqueOrderById(id);
  }

  @Post()
  async createOrder(@Body() order: CreateOrderDto) {
    await this.ordersService.createOrder(order);
  }

  @Patch(':id')
  updateOrder(@Param('id') id: string, @Body() order: UpdateOrderDto) {
    return this.ordersService.updateOrder(id, order);
  }
}
