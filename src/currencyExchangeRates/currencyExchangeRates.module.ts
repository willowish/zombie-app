import { HttpModule, Module } from '@nestjs/common';
import { CurrencyExchangeRatesService } from './currencyExchangeRates.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule.forRoot()],
  providers: [CurrencyExchangeRatesService],
  exports: [CurrencyExchangeRatesService],
})
export class CurrencyExchangeRatesModule {}
