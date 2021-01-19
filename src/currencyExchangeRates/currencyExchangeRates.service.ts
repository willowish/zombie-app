import { HttpException, HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, map } from 'rxjs/operators';
import { CurrencyExchangeRate } from './model/CurrencyExchangeRate';
import { ExchangeRatesResponse } from './model/exchangeRatesResponse';
import { ExchangeRatesException } from './exceptions/exchangeRatesException';

@Injectable()
export class CurrencyExchangeRatesService {
  private readonly SUPPORTED_CURRENCIES = ['EUR', 'USD'];

  constructor(
    private httpService: HttpService,
    private config: ConfigService,
  ) {}

  getDailyExchangeRates(): Promise<CurrencyExchangeRate[]> {
    return this.httpService
      .get<ExchangeRatesResponse[]>(this.config.get('EXCHANGE_RATES_URL'))
      .pipe(
        catchError((e) => {
          throw new ExchangeRatesException(
            e.response?.data,
            e.response?.status,
          );
        }),
        map((response) => {
          return Object.values(response.data[0].rates).filter(
            (rate: CurrencyExchangeRate) => {
              return this.SUPPORTED_CURRENCIES.includes(rate.code);
            },
          );
        }),
      )
      .toPromise();
  }
}
