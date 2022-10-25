import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateItemListDto {
  @IsString()
  @IsNotEmpty()
  product_id: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
