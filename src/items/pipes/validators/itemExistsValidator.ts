import {
  ArgumentMetadata,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { ItemsService } from '../../items.service';

@Injectable()
export class ItemExistsValidator implements PipeTransform<number | number[]> {
  constructor(private itemsService: ItemsService) {}

  async transform(id: number, metadata: ArgumentMetadata) {
    console.log(id);
    if (Array.isArray(id)) {
      return id;
    }
    const item = await this.itemsService.findOne(id);
    if (!item) {
      throw new NotFoundException(`Item with given ID doesn't exists`);
    }

    return id;
  }
}
