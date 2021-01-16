import { PartialType } from '@nestjs/mapped-types';
import { CreateZombieDto } from './create-zombie.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Item } from '../../items/entities/item.entity';
import { MaxLength } from 'class-validator';

export class UpdateZombieDto extends PartialType(CreateZombieDto) {
  @ApiProperty()
  name: string;

  @MaxLength(5, {
    each: true,
  })
  @ApiProperty()
  items: Item[];
}
