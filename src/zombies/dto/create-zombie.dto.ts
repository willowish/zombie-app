import { Item } from '../../items/entities/item.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateZombieDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  items: Item[];
}
