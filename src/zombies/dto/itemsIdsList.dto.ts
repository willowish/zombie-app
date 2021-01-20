import { ApiProperty } from '@nestjs/swagger';

export class ItemsIdsListDTO {
  @ApiProperty({ type: [Number] })
  items: number[];
}
