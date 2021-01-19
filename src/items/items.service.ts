import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ItemsPricesUpdaterService } from './services/itemsPricesUpdater.service';

@Injectable()
export class ItemsService {
  private readonly logger = new Logger(ItemsService.name);

  constructor(
    @InjectRepository(Item) private repository: Repository<Item>,
    private itemsPricesUpdater: ItemsPricesUpdaterService,
  ) {}

  findOne(id: number): Promise<Item> {
    return this.repository.findOne(id);
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, { timeZone: 'UTC' })
  async updatePrices() {
    try {
      const itemsWithPrices = await this.itemsPricesUpdater.getItemsWithPrices();
      await this.repository.save(itemsWithPrices.items);
    } catch (e) {
      this.logger.error(e);
    }
  }
}
