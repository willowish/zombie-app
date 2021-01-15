import { Controller, Get, Param } from '@nestjs/common';
import { ZombiesService } from './zombies.service';
import { Crud, CrudController } from '@nestjsx/crud';
import { Zombie } from './entities/zombie.entity';
import { CreateZombieDto } from './dto/create-zombie.dto';
import { UpdateZombieDto } from './dto/update-zombie.dto';

@Crud({
  model: {
    type: Zombie,
  },
  dto: {
    create: CreateZombieDto,
    update: UpdateZombieDto,
  },
  query: {
    alwaysPaginate: true,
  },
  params: {
    id: {
      type: 'uuid',
      primary: true,
      field: 'id',
    },
  },
})
@Controller('zombies')
export class ZombiesController implements CrudController<Zombie> {
  constructor(public service: ZombiesService) {}

  @Get(':id/items')
  public getZombieItems(@Param('id') id: string) {
    return this.service.getZombieItems(id);
  }
}
