import { Item } from '../../items/entities/item.entity';
import { MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateZombieDto {
  @ApiProperty({ description: 'Name of a zombie.' })
  name: string;

  @ApiProperty({ description: 'Items that zombie owns.' })
  @MaxLength(5, {
    each: true,
    message: `Zombie can't have more than 5 items.`,
  })
  items: Item[];
}
