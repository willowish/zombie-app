import { ApiProperty } from '@nestjs/swagger';
import { UpdateZombieDto } from './update-zombie.dto';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateZombieBulkDto {
  @ApiProperty({ type: [UpdateZombieDto] })
  @ValidateNested({ each: true })
  @Type((type) => UpdateZombieDto)
  zombies: UpdateZombieDto[];
}
