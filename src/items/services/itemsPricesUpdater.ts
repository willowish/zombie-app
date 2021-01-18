import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map } from 'rxjs/operators';
import { ZombieItemsDto } from '../dto/zombieItemsPrices.dto';

@Injectable()
export class ItemsPricesUpdater {
  constructor(
    private httpService: HttpService,
    private config: ConfigService,
  ) {}

  async getItemsWithPrices() {
    return this.httpService
      .get<ZombieItemsDto>(this.config.get('ZOMBIES_ITEMS_PRICE_URL'))
      .pipe(map((values) => ({ items: values.data.items })))
      .toPromise();
  }
}
