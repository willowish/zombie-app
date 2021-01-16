import { PartialType } from '@nestjs/mapped-types';
import { CreateZombieDto } from './create-zombie.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Item } from '../../items/entities/item.entity';

export class UpdateZombieDto extends PartialType(CreateZombieDto) {
  @ApiProperty()
  name: string;

  @ApiProperty()
  items: Item[];
}
