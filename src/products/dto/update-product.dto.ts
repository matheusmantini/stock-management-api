import { IsNumber, IsString } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  id: string;
  @IsNumber()
  qty_stock: number;
}
