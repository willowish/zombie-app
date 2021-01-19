import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map } from 'rxjs/operators';
import { ZombieItemsDto } from '../dto/zombieItemsPrices.dto';
import { Item } from '../entities/item.entity';

@Injectable()
export class ItemsPricesUpdaterService {
  constructor(
    private httpService: HttpService,
    private config: ConfigService,
  ) {}

  async getItemsWithPrices(): Promise<{ items: Item[] }> {
    return this.httpService
      .get<ZombieItemsDto>(this.config.get('ZOMBIES_ITEMS_PRICE_URL'))
      .pipe(map((values) => ({ items: values.data.items })))
      .toPromise();
  }
}
