import { HttpModule, Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './entities/item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsPricesUpdaterService } from './services/itemsPricesUpdater.service';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([Item]),
  ],
  providers: [ItemsService, ItemsPricesUpdaterService],
})
export class ItemsModule {}
