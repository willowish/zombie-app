import { PartialType } from '@nestjs/mapped-types';
import { CreateZombieDto } from './create-zombie.dto';

export class UpdateZombieDto extends PartialType(CreateZombieDto) {}
