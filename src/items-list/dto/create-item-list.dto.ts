import { Prisma } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateItemListDto {
  @IsString()
  @IsNotEmpty()
  product_id: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @Exclude()
  product: Prisma.ProductsCreateNestedOneWithoutProductItemInput;
}
