import { IsNumber } from 'class-validator';

export class UpdateProductQuantityDto {
  @IsNumber()
  quantity: number;
}
