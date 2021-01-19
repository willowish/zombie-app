import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyExchangeRatesService } from './currencyExchangeRates.service';
import { HttpException, HttpModule, HttpService } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getMockedHttpResponse } from '../utils/testUtils/getMockedHttpResponse';
import { ExchangeRatesException } from './exceptions/exchangeRatesException';
import { throwError } from 'rxjs';

describe('CurrencyExchangeRatesService', () => {
  let exchangeRatesService: CurrencyExchangeRatesService;
  let httpService: HttpService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule.forRoot()],
      providers: [CurrencyExchangeRatesService],
    }).compile();

    exchangeRatesService = module.get<CurrencyExchangeRatesService>(
      CurrencyExchangeRatesService,
    );
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be return EUR exchange rate', async () => {
    // given
    const data = [
      {
        rates: [
          {
            currency: 'euro',
            code: 'EUR',
            bid: 4.47,
          },
        ],
      },
    ];
    const response = getMockedHttpResponse({ data });
    jest.spyOn(httpService, 'get').mockReturnValue(response);
    // when
    const dailyExchangeRates = await exchangeRatesService.getDailyExchangeRates();
    // then
    expect(dailyExchangeRates).toStrictEqual(data[0].rates);
  });

  it('should filter currencies that are not supported', async () => {
    // given
    const data = [
      {
        rates: [
          {
            currency: 'euro',
            code: 'EUR',
            bid: 4.47,
          },
          {
            currency: 'test currency',
            code: 'FREE',
            bid: 0,
          },
        ],
      },
    ];
    const response = getMockedHttpResponse({ data });
    jest.spyOn(httpService, 'get').mockReturnValue(response);
    // when
    const dailyExchangeRates = await exchangeRatesService.getDailyExchangeRates();
    // then
    expect(dailyExchangeRates).toStrictEqual([data[0].rates[0]]);
  });

  it('should throw exception when external service responded with error status', () => {
    // given
    const error = {
      data: 'Nope',
      status: 504,
    };
    jest.spyOn(httpService, 'get').mockReturnValue(throwError(error));
    // when
    // then
    expect(exchangeRatesService.getDailyExchangeRates()).rejects.toMatch(
      error.data,
    );
  });
});
