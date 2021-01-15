import { Injectable } from '@nestjs/common';
import { Item } from './entities/item.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ItemsService extends TypeOrmCrudService<Item> {
  constructor(@InjectRepository(Item) repository: Repository<Item>) {
    super(repository);
  }
}
