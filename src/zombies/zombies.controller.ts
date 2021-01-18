import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UsePipes,
  Patch,
  ParseArrayPipe,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ZombiesService } from './zombies.service';
import { CreateZombieDto } from './dto/create-zombie.dto';
import { UpdateZombieDto } from './dto/update-zombie.dto';
import { ItemsValue } from './dto/itemsValue';
import { MaxNumberOfItemsValidator } from './pipes/maxNumberOfItemsValidator/max-number-of-items-validator.service';
import { ZombieExistsValidator } from './pipes/zombieExistsValidator/zombieExistsValidator';
import { NonEmptyValidator } from './pipes/notEmptyValidator/nonEmptyValidator.pipe';

@Controller('zombies')
export class ZombiesController {
  constructor(private readonly zombiesService: ZombiesService) {}

  @Post()
  create(@Body() createZombieDto: CreateZombieDto) {
    return this.zombiesService.create(createZombieDto);
  }

  @Post('bulk')
  createBulk(
    @Body(new ParseArrayPipe({ items: CreateZombieDto }))
    createZombieDtos: CreateZombieDto[],
  ) {
    return this.zombiesService.createBulk(createZombieDtos);
  }

  @Patch('bulk')
  updateBulk(
    @Body(new ParseArrayPipe({ items: UpdateZombieDto }))
    createZombieDtos: UpdateZombieDto[],
  ) {
    return this.zombiesService.updateBulk(createZombieDtos);
  }

  @Delete('bulk')
  deleteBulk(
    @Body()
    ids: string[],
  ) {
    return this.zombiesService.removeBulk(ids);
  }

  @Get()
  findAll() {
    return this.zombiesService.findAll();
  }

  @UsePipes(ZombieExistsValidator)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zombiesService.findOne(id);
  }

  @UsePipes(MaxNumberOfItemsValidator, ZombieExistsValidator, NonEmptyValidator)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateZombieDto: UpdateZombieDto) {
    return this.zombiesService.update(id, updateZombieDto);
  }

  @UsePipes(ZombieExistsValidator)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.zombiesService.remove(id);
  }

  @UsePipes(ZombieExistsValidator)
  @Get(':id/items')
  findOneItems(@Param('id') id: string) {
    return this.zombiesService.getZombieItems(id);
  }

  @UsePipes(ZombieExistsValidator)
  @Get(':id/items/value')
  public getZombieItemsValue(@Param('id') id: string): Promise<ItemsValue> {
    return this.zombiesService.getZombieItemsValue(id);
  }
}
