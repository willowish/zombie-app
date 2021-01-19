import { PartialType } from '@nestjs/mapped-types';
import { CreateZombieDto } from './create-zombie.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Item } from '../../items/entities/item.entity';
import { MaxLength } from 'class-validator';
import { Optional } from '@nestjs/common';

export class UpdateZombieDto extends PartialType(CreateZombieDto) {
  @Optional()
  id?: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  @MaxLength(5, {
    each: true,
  })
  items: Item[];
}
