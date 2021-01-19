import { HttpModule, HttpService } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { ItemsPricesUpdaterService } from './itemsPricesUpdater.service';
import { ZombieItemsDto } from '../dto/zombieItemsPrices.dto';
import { getMockedHttpResponse } from '../../utils/testUtils/getMockedHttpResponse';

describe('ItemsPricesUpdaterService tests', () => {
  let itemsPricesUpdaterService: ItemsPricesUpdaterService;
  let httpService: HttpService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule.forRoot()],
      providers: [ItemsPricesUpdaterService],
    }).compile();

    itemsPricesUpdaterService = module.get<ItemsPricesUpdaterService>(
      ItemsPricesUpdaterService,
    );
    httpService = module.get<HttpService>(HttpService);
  });

  it('should return list of items returned by API', async () => {
    // given
    const data: ZombieItemsDto = {
      items: [
        {
          id: 1,
          name: 'Diamond Sword',
          price: 100,
        },
        {
          id: 2,
          name: 'Trident',
          price: 200,
        },
      ],
    };
    const response = getMockedHttpResponse<ZombieItemsDto>({ data });
    jest.spyOn(httpService, 'get').mockReturnValue(response);
    // when
    const { items } = await itemsPricesUpdaterService.getItemsWithPrices();
    // then
    expect(items).toStrictEqual(data.items);
  });
});
