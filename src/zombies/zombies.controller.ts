import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  UsePipes,
} from '@nestjs/common';
import { ZombiesService } from './zombies.service';
import { CreateZombieDto } from './dto/create-zombie.dto';
import { UpdateZombieDto } from './dto/update-zombie.dto';
import { MaxNumberOfItemsValidator } from './pipes/maxNumberOfItemsValidator/max-number-of-items-validator.service';
import { ZombieExistsValidator } from './pipes/zombieExistsValidator/zombieExistsValidator';
import { NonEmptyValidator } from './pipes/notEmptyValidator/nonEmptyValidator.pipe';
import { ItemExistsValidator } from '../items/pipes/validators/itemExistsValidator';
import { ItemsIdsListDTO } from './dto/itemsIdsList.dto';
import { ItemsValue } from './dto/itemsValue.dto';
import { CreateZombieBulkDto } from './dto/createZombieBulk.dto';
import { UpdateZombieBulkDto } from './dto/updateZombieBulk.dto';
import { ApiConsumes, ApiOperation } from '@nestjs/swagger';

@UsePipes(NonEmptyValidator)
@Controller('zombies')
export class ZombiesController {
  constructor(private readonly zombiesService: ZombiesService) {}

  @Post()
  create(@Body() createZombieDto: CreateZombieDto) {
    return this.zombiesService.create(createZombieDto);
  }

  @Post('bulk')
  createBulk(@Body() createZombieDtos: CreateZombieBulkDto) {
    return this.zombiesService.createBulk(createZombieDtos.zombies);
  }

  @Patch('bulk')
  updateBulk(
    @Body()
    updateZombieDto: UpdateZombieBulkDto,
  ) {
    return this.zombiesService.updateBulk(updateZombieDto.zombies);
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

  @Post(':zombieId/items')
  addItemsToZombie(
    @Param('zombieId', ParseUUIDPipe, ZombieExistsValidator) zombieId: string,
    @Body() items: ItemsIdsListDTO,
  ) {
    return this.zombiesService.addItemsToZombie(zombieId, items.items);
  }

  @Delete(':zombieId/items/:itemId')
  deleteItemFromZombie(
    @Param('zombieId', ParseUUIDPipe, ZombieExistsValidator) zombieId: string,
    @Param('itemId', ItemExistsValidator, ParseIntPipe) itemId: number,
  ) {
    return this.zombiesService.removeItemFromZombie(zombieId, itemId);
  }

  @UsePipes(ZombieExistsValidator)
  @Get(':id/items/value')
  public getZombieItemsValue(@Param('id') id: string): Promise<ItemsValue> {
    return this.zombiesService.getZombieItemsValue(id);
  }
}
