import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Zombie } from './entities/zombie.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ZombiesService extends TypeOrmCrudService<Zombie> {
  constructor(@InjectRepository(Zombie) repository: Repository<Zombie>) {
    super(repository);
  }
}
