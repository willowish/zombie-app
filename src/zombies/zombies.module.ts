import { Module } from '@nestjs/common';
import { ZombiesService } from './zombies.service';
import { ZombiesController } from './zombies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Zombie } from './entities/zombie.entity';
import { CurrencyExchangeRatesModule } from '../currencyExchangeRates/currencyExchangeRates.module';

@Module({
  imports: [TypeOrmModule.forFeature([Zombie]), CurrencyExchangeRatesModule],
  controllers: [ZombiesController],
  providers: [ZombiesService],
})
export class ZombiesModule {}
