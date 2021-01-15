import { HttpModule, Module } from '@nestjs/common';
import { CurrencyExchangeRatesService } from './currency-exchange-rates.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule.forRoot()],
  providers: [CurrencyExchangeRatesService],
  exports: [CurrencyExchangeRatesService],
})
export class CurrencyExchangeRatesModule {}
