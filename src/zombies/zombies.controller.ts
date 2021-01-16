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
} from '@nestjs/common';
import { ZombiesService } from './zombies.service';
import { CreateZombieDto } from './dto/create-zombie.dto';
import { UpdateZombieDto } from './dto/update-zombie.dto';
import { ItemsValue } from './dto/itemsValue';
import { MaxNumberOfItemsValidatorPipe } from './pipes/maxNumberOfItemsValidator.pipe';

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
    @Body()
    createZombieDtos: CreateZombieDto[],
  ) {
    return this.zombiesService.createBulk(createZombieDtos);
  }

  @Get()
  findAll() {
    return this.zombiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zombiesService.findOne(id);
  }

  @UsePipes(MaxNumberOfItemsValidatorPipe)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateZombieDto: UpdateZombieDto) {
    return this.zombiesService.update(id, updateZombieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zombiesService.remove(id);
  }

  @Get(':id/items')
  findOneItems(@Param('id') id: string) {
    return this.zombiesService.getZombieItems(id);
  }

  @Get(':id/items/value')
  public getZombieItemsValue(@Param('id') id: string): Promise<ItemsValue> {
    return this.zombiesService.getZombieItemsValue(id);
  }
}
