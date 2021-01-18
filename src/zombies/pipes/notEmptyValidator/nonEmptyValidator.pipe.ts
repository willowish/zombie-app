import { Injectable, PipeTransform } from '@nestjs/common';
import { UpdateZombieDto } from '../../dto/update-zombie.dto';
import { isEmpty } from 'lodash';
import { EmptyObjectException } from '../../execptions/EmptyObject.exception';

@Injectable()
export class NonEmptyValidator implements PipeTransform<UpdateZombieDto> {
  async transform(value: UpdateZombieDto) {
    if (isEmpty(value)) {
      throw new EmptyObjectException();
    }
    return value;
  }
}
