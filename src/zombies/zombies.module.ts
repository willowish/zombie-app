import { HttpModule, Module } from '@nestjs/common';
import { ZombiesService } from './zombies.service';
import { ZombiesController } from './zombies.controller';
import { Zombie } from './entities/zombie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrencyExchangeRatesModule } from '../currency-exchange-rates/currency-exchange-rates.module';

@Module({
  imports: [TypeOrmModule.forFeature([Zombie]), CurrencyExchangeRatesModule],
  controllers: [ZombiesController],
  providers: [ZombiesService],
  exports: [ZombiesService],
})
export class ZombiesModule {}
