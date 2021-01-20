import { ApiProperty } from '@nestjs/swagger';

export class ItemDto {
  @ApiProperty({ description: 'ID of an item' })
  id: number;
}
