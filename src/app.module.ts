import { Module } from '@nestjs/common';
import { DatabaseModule } from './databaseModule/database.module';
import { ZombiesModule } from './zombies/zombies.module';
import { ItemsModule } from './items/items.module';
import { CurrencyExchangeRatesModule } from './currency-exchange-rates/currency-exchange-rates.module';

@Module({
  imports: [DatabaseModule, ZombiesModule, ItemsModule, CurrencyExchangeRatesModule],
})
export class AppModule {}
