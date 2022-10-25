import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateItemListDto } from './dto/create-item-list.dto';
import { UpdateItemListDto } from './dto/update-item-list.dto';

@Injectable()
export class ItemsListService {
  constructor(private prisma: PrismaService) {}

  create(createItemListDto: CreateItemListDto) {
    return this.prisma.itemList.create({ data: createItemListDto });
  }

  findAll() {
    return this.prisma.itemList.findMany();
  }

  findOneById(id: string) {
    return this.prisma.itemList.findUnique({ where: { id } });
  }

  updateQuantity(id: string, updateItemListDto: UpdateItemListDto) {
    return this.prisma.itemList.update({
      where: { id },
      data: updateItemListDto,
    });
  }

  remove(id: string) {
    return this.prisma.itemList.delete({ where: { id } });
  }
}
