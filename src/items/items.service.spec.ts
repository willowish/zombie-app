import { Test, TestingModule } from '@nestjs/testing';
import { ItemsService } from './items.service';
import { ItemsPricesUpdaterService } from './services/itemsPricesUpdater.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Repository } from 'typeorm';

describe('ItemsService', () => {
  let service: ItemsService;
  let repo: Repository<Item>;
  let itemsPricesUpdaterService: ItemsPricesUpdaterService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemsService,
        {
          provide: ItemsPricesUpdaterService,
          useValue: {
            getItemsWithPrices: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Item),
          useValue: {
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ItemsService>(ItemsService);
    repo = module.get<Repository<Item>>(getRepositoryToken(Item));
    itemsPricesUpdaterService = module.get<ItemsPricesUpdaterService>(
      ItemsPricesUpdaterService,
    );
  });

  it('save every item provided by API ', async () => {
    // given
    const serviceMockedResponse = {
      items: [
        {
          id: 2,
          name: 'Trident',
          price: 200,
        },
        {
          id: 31,
          name: 'Trident sword',
          price: 777,
        },
      ],
    };
    jest
      .spyOn(itemsPricesUpdaterService, 'getItemsWithPrices')
      .mockReturnValue(Promise.resolve(serviceMockedResponse));
    const repoSpy = jest.spyOn(repo, 'save');
    // when
    await service.updatePrices();
    // then
    expect(repoSpy).toHaveBeenCalled();
    expect(repoSpy).toBeCalledWith(serviceMockedResponse.items);
  });
});
