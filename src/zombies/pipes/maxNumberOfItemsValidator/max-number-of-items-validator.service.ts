import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ZombiesService } from '../../zombies.service';

@Injectable()
export class MaxNumberOfItemsValidator implements PipeTransform {
  private readonly MAX_NUMBER_OF_ITEMS = 5;
  constructor(private zombieService: ZombiesService) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    console.log(value);
    if (typeof value !== 'string') {
      return value;
    }
    const numberOfItems = await this.zombieService.getNumberOfItems(value);
    if (numberOfItems >= this.MAX_NUMBER_OF_ITEMS) {
      throw new BadRequestException('Zombie reach maximum number of items');
    }

    return value;
  }
}
