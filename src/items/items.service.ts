import { Inject, Injectable } from '@nestjs/common';
import { Item } from './entities/item.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemsPricesUpdater } from './services/itemsPricesUpdater';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class ItemsService extends TypeOrmCrudService<Item> {
  constructor(
    @InjectRepository(Item) repository: Repository<Item>,
    private itemsPricesUpdater: ItemsPricesUpdater,
  ) {
    super(repository);
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, { timeZone: 'UTC' })
  async updatePrices() {
    const itemsWithPrices = await this.itemsPricesUpdater.getItemsWithPrices();
    await this.repo.save(itemsWithPrices.items);
  }
}
