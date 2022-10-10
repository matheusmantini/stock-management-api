import { PartialType } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';
import { CreateOrderDto } from './create-order.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @IsString()
  @IsOptional()
  client_name: string;

  @IsDateString()
  @IsOptional()
  delivery_date: Date;

  @IsOptional()
  items_list_id: string[];
}
