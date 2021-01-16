import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Zombie } from '../zombies/entities/zombie.entity';
import { Repository } from 'typeorm';
import { CreateZombieDto } from '../zombies/dto/create-zombie.dto';
import { UpdateZombieDto } from '../zombies/dto/update-zombie.dto';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemsService {
  constructor(@InjectRepository(Item) private repository: Repository<Item>) {}

  create(createZombieDto: CreateItemDto) {
    return this.repository.save(createZombieDto);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOne({ id });
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    return this.repository.save(updateItemDto);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
