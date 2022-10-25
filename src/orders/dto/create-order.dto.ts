import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  client_name: string;

  @IsDateString()
  @IsNotEmpty()
  delivery_date: Date;

  @IsNotEmpty()
  items_list_id: string[];

  total_amount?: number;
}
