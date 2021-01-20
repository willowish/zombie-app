import { ArrayMaxSize, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ItemDto } from '../../items/dto/item.dto';

export class CreateZombieDto {
  @ApiProperty({ description: 'Name of a zombie.' })
  name: string;

  @ApiProperty({ description: 'Items that zombie owns.', type: [ItemDto] })
  @IsOptional()
  @ArrayMaxSize(5, {
    message: `Zombie can't have more than 5 items.`,
  })
  items: ItemDto[];
}
