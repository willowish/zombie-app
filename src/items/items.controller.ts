import { Controller } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';
import { Crud } from '@nestjsx/crud';

@Crud({
  model: {
    type: Item,
  },
  dto: {
    create: CreateItemDto,
    update: UpdateItemDto,
  },
  params: {
    id: {
      type: 'uuid',
      primary: true,
      field: 'id',
    },
  },
})
@Controller('items')
export class ItemsController {
  constructor(public service: ItemsService) {}
}
