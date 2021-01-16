import { Injectable } from '@nestjs/common';
import { CreateZombieDto } from './dto/create-zombie.dto';
import { UpdateZombieDto } from './dto/update-zombie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Zombie } from './entities/zombie.entity';
import { Repository } from 'typeorm';
import { Item } from '../items/entities/item.entity';
import { ItemsValue } from './dto/itemsValue';
import { CurrencyExchangeRatesService } from '../currencyExchangeRates/currencyExchangeRates.service';
import { defaultsDeep, uniqBy } from 'lodash';

@Injectable()
export class ZombiesService {
  constructor(
    @InjectRepository(Zombie) private repository: Repository<Zombie>,
    private exchangeRate: CurrencyExchangeRatesService,
  ) {}

  create(createZombieDto: CreateZombieDto) {
    return this.repository.save(createZombieDto);
  }

  createBulk(createZombieDto: CreateZombieDto[]) {
    return this.repository.save(createZombieDto);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: string) {
    return this.repository.findOne({ id });
  }

  async update(id: string, updateZombieDto: UpdateZombieDto) {
    const user = await this.repository.findOne(id, { relations: ['items'] });
    const updatedItems = uniqBy(
      [...updateZombieDto.items, ...user.items],
      'id',
    );
    const updatedUser = { ...user, ...updateZombieDto };
    updatedUser.items = updatedItems;
    return this.repository.save(updatedUser);
  }

  updateBulk(createZombieDtos: UpdateZombieDto[]) {
    return createZombieDtos.map((z) => this.update(z.id, z));
  }

  remove(id: string) {
    return this.repository.delete(id);
  }

  removeBulk(ids: string[]) {
    ids.forEach(this.remove);
  }

  async getZombieItems(id: string): Promise<Item[]> {
    const zombie = await this.repository.findOne(id, {
      where: { id },
      relations: ['items'],
    });
    return zombie.items;
  }

  async getNumberOfItems(id: string): Promise<number> {
    const zombieItems = await this.getZombieItems(id);
    return zombieItems.length;
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
      .reduce(({ EUR, PLN, USD }, item) => ({
        PLN: PLN + item.PLN,
        EUR: EUR + item.EUR,
        USD: USD + item.USD,
      }));
  }
}
