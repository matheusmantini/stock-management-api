import { IsNumber } from 'class-validator';

export class UpdateProductDto {
  @IsNumber()
  qty_stock: number;
}
