import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Zombie } from './entities/zombie.entity';
import { Repository } from 'typeorm';
import { Item } from '../items/entities/item.entity';

@Injectable()
export class ZombiesService extends TypeOrmCrudService<Zombie> {
  constructor(@InjectRepository(Zombie) repo: Repository<Zombie>) {
    super(repo);
  }

  async getZombieItems(id: string): Promise<Item[]> {
    const zombie = await this.repo.findOne(id, {
      where: { id },
      relations: ['items'],
    });
    return zombie.items;
  }
}
