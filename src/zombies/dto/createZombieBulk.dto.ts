import { ApiProperty } from '@nestjs/swagger';
import { CreateZombieDto } from './create-zombie.dto';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateZombieBulkDto {
  @ApiProperty({ type: [CreateZombieDto] })
  @ValidateNested({ each: true })
  @Type((type) => CreateZombieDto)
  zombies: CreateZombieDto[];
}
