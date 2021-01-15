import { Controller } from '@nestjs/common';
import { ZombiesService } from './zombies.service';
import { Crud } from '@nestjsx/crud';
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
  params: {
    id: {
      type: 'uuid',
      primary: true,
      field: 'id',
    },
  },
})
@Controller('zombies')
export class ZombiesController {
  constructor(public service: ZombiesService) {}
}
