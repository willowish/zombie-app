import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyExchangeRatesService } from './currency-exchange-rates.service';

describe('CurrencyExchangeRatesService', () => {
  let service: CurrencyExchangeRatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CurrencyExchangeRatesService],
    }).compile();

    service = module.get<CurrencyExchangeRatesService>(CurrencyExchangeRatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
