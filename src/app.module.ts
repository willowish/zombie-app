import { Module } from '@nestjs/common';
import { DatabaseModule } from './databaseModule/database.module';
import { ZombiesModule } from './zombies/zombies.module';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [DatabaseModule, ZombiesModule, ItemsModule],
})
export class AppModule {}
