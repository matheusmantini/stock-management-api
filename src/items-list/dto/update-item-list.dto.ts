import { PartialType } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { CreateItemListDto } from './create-item-list.dto';

export class UpdateItemListDto extends PartialType(CreateItemListDto) {
  @IsOptional()
  product_id?: string;
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
