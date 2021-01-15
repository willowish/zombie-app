import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Zombie } from './entities/zombie.entity';
import { Repository } from 'typeorm';
import { Item } from '../items/entities/item.entity';
import { CurrencyExchangeRatesService } from '../currency-exchange-rates/currency-exchange-rates.service';
import { ItemsValue } from './dto/itemsValue';

@Injectable()
export class ZombiesService extends TypeOrmCrudService<Zombie> {
  constructor(
    @InjectRepository(Zombie) repo: Repository<Zombie>,
    private exchangeRate: CurrencyExchangeRatesService,
  ) {
    super(repo);
  }

  async getZombieItems(id: string): Promise<Item[]> {
    const zombie = await this.repo.findOne(id, {
      where: { id },
      relations: ['items'],
    });
    return zombie.items;
  }

  async getZombieItemsValue(id: string): Promise<ItemsValue> {
    const rates = await this.exchangeRate.getDailyExchangeRates();
    const zombieItems = await this.getZombieItems(id);
    return zombieItems
      .map((i) => ({
        PLN: i.price,
        EUR: rates.find((r) => r.code === 'EUR').bid * i.price,
        USD: rates.find((r) => r.code === 'USD').bid * i.price,
      }))
      .reduce((acc, item) => ({
        PLN: acc.PLN + item.PLN,
        EUR: acc.EUR + item.EUR,
        USD: acc.USD + item.USD,
      }));
  }
}
