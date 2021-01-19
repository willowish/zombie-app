import { HttpException, Injectable } from '@nestjs/common';
import { CreateZombieDto } from './dto/create-zombie.dto';
import { UpdateZombieDto } from './dto/update-zombie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Zombie } from './entities/zombie.entity';
import { Repository } from 'typeorm';
import { Item } from '../items/entities/item.entity';
import { ItemsValue } from './dto/itemsValue';
import { CurrencyExchangeRatesService } from '../currencyExchangeRates/currencyExchangeRates.service';
import { uniqBy } from 'lodash';
import { extractItemsSumValue } from './services/extractItemsSumValue';

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
    const zombie = await this.repository.findOne(id, {
      relations: ['items'],
    });
    const updatedZombie = this.getUpdatedZombie(zombie, updateZombieDto);
    return this.repository.save(updatedZombie);
  }

  updateBulk(createZombieDtos: UpdateZombieDto[]) {
    return createZombieDtos.map((z) => this.update(z.id, z));
  }

  remove(id: string) {
    return this.repository.delete(id);
  }

  removeBulk(ids: string[]) {
    ids.forEach((id) => this.remove(id));
  }

  removeItemFromZombie(zombieId: string, itemId: number) {
    return this.repository
      .createQueryBuilder()
      .relation(Zombie, 'items')
      .of(zombieId)
      .remove(itemId);
  }

  async getZombieItems(id: string): Promise<Item[]> {
    const zombie = await this.repository.findOne(id, {
      relations: ['items'],
    });
    return zombie.items ?? [];
  }

  async getNumberOfItems(id: string): Promise<number> {
    const zombieItems = await this.getZombieItems(id);
    return zombieItems.length;
  }

  async getZombieItemsValue(id: string): Promise<ItemsValue> {
    const rates = await this.exchangeRate.getDailyExchangeRates();
    const zombieItems = await this.getZombieItems(id);
    return extractItemsSumValue(zombieItems, rates);
  }

  addItemsToZombie(id: string, itemsIds: number[]) {
    return this.repository
      .createQueryBuilder()
      .relation(Zombie, 'items')
      .of(id)
      .add(itemsIds);
  }

  private getUpdatedZombie(zombie: Zombie, updateZombieDto: UpdateZombieDto) {
    const updatedItems = this.mergeItemsWithNewOnes(updateZombieDto, zombie);
    const updatedZombie = { ...zombie, ...updateZombieDto };
    updatedZombie.items = updatedItems;
    return updatedZombie;
  }

  private mergeItemsWithNewOnes(
    updateZombieDto: UpdateZombieDto,
    zombie: Zombie,
  ) {
    return uniqBy(
      [...(updateZombieDto?.items ?? []), ...(zombie?.items ?? [])],
      'id',
    );
  }
}
