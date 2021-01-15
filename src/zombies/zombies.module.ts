import { Module } from '@nestjs/common';
import { ZombiesService } from './zombies.service';
import { ZombiesController } from './zombies.controller';
import { Zombie } from './entities/zombie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Zombie])],
  controllers: [ZombiesController],
  providers: [ZombiesService],
  exports: [ZombiesService],
})
export class ZombiesModule {}
