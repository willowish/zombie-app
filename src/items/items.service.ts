import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ItemsPricesUpdater } from './services/itemsPricesUpdater';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item) private repository: Repository<Item>,
    private itemsPricesUpdater: ItemsPricesUpdater,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, { timeZone: 'UTC' })
  async updatePrices() {
    const itemsWithPrices = await this.itemsPricesUpdater.getItemsWithPrices();
    await this.repository.save(itemsWithPrices.items);
  }
}
