import { PartialType } from '@nestjs/mapped-types';
import { CreateZombieDto } from './create-zombie.dto';
import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, IsOptional } from 'class-validator';
import { ItemDto } from '../../items/dto/item.dto';

export class UpdateZombieDto extends PartialType(CreateZombieDto) {
  @IsOptional()
  id?: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ description: 'Items that zombie owns.', type: [ItemDto] })
  @IsOptional()
  @ArrayMaxSize(5, {
    message: `Zombie can't have more than 5 items.`,
  })
  items: ItemDto[];
}
