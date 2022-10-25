import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateItemListDto {
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
