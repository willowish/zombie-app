import { Module } from '@nestjs/common';
import { DatabaseModule } from './databaseModule/database.module';
import { ZombiesModule } from './zombies/zombies.module';

@Module({
  imports: [DatabaseModule, ZombiesModule],
})
export class AppModule {}
