import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Item } from '../../items/entities/item.entity';

@Entity()
export class Zombie {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column()
  name: string;

  @ManyToMany(() => Item)
  @JoinTable()
  items: Item[];
}
