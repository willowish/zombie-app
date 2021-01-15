import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { filter, map } from 'rxjs/operators';
import { CurrencyExchangeRate } from './model/CurrencyExchangeRate';

type Response = {
  table: string;
  no: string;
  rates: CurrencyExchangeRate[];
};

@Injectable()
export class CurrencyExchangeRatesService {
  private readonly SUPPORTED_CURRENCIES = ['EUR', 'USD'];

  constructor(
    private httpService: HttpService,
    private config: ConfigService,
  ) {}

  getDailyExchangeRates() {
    return this.httpService
      .get<Response[]>(this.config.get('EXCHANGE_RATES_URL'))
      .pipe(
        map((response) =>
          Object.values(response.data[0].rates).filter(
            (rate: CurrencyExchangeRate) => {
              return this.SUPPORTED_CURRENCIES.includes(rate.code);
            },
          ),
        ),
      )
      .toPromise();
  }
}
