import {
  ArgumentMetadata,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { ZombiesService } from '../../zombies.service';

@Injectable()
export class ZombieExistsValidator implements PipeTransform {
  constructor(private zombieService: ZombiesService) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    if (typeof value !== 'string') {
      return value;
    }
    const zombie = await this.zombieService.findOne(value);
    if (!zombie) {
      throw new NotFoundException(`Zombie with given ID doesn't exists`);
    }

    return value;
  }
}
