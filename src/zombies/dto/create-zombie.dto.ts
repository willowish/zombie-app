import { Item } from '../../items/entities/item.entity';
import { MaxLength } from 'class-validator';

export class CreateZombieDto {
  name: string;

  @MaxLength(5, {
    each: true,
  })
  items: Item[];
}
