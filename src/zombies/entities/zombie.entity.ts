import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Zombie {
  @PrimaryGeneratedColumn('uuid') id: string;
}
