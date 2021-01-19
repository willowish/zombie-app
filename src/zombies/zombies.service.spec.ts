import { Test, TestingModule } from '@nestjs/testing';
import { ZombiesService } from './zombies.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Item } from '../items/entities/item.entity';
import { Zombie } from './entities/zombie.entity';
import { CurrencyExchangeRatesService } from '../currencyExchangeRates/currencyExchangeRates.service';
import { CreateZombieDto } from './dto/create-zombie.dto';
import { Repository } from 'typeorm';
import { UpdateZombieDto } from './dto/update-zombie.dto';
import { CurrencyExchangeRate } from '../currencyExchangeRates/model/CurrencyExchangeRate';

const getExchangeRate = (
  currency: string,
  code: string,
  bid: number,
): CurrencyExchangeRate => ({
  currency,
  code,
  bid,
});

describe('ZombiesService', () => {
  let service: ZombiesService;
  let repo: Repository<Zombie>;
  let exchangeRateService: CurrencyExchangeRatesService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ZombiesService,
        {
          provide: getRepositoryToken(Zombie),
          useValue: {
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: CurrencyExchangeRatesService,
          useValue: {
            getDailyExchangeRates: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ZombiesService>(ZombiesService);
    repo = module.get<Repository<Zombie>>(getRepositoryToken(Zombie));
    exchangeRateService = module.get<CurrencyExchangeRatesService>(
      CurrencyExchangeRatesService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call save when creating new entity', async () => {
    // given
    const zombieDTO: CreateZombieDto = { items: [], name: 'lel' };
    const repoSpy = jest.spyOn(repo, 'save');
    // when
    await service.create(zombieDTO);
    // then
    expect(repoSpy).toHaveBeenCalled();
  });

  it('should call save with a list of zombies when creating zombies in bulk', async () => {
    // given
    const zombieDTOList: CreateZombieDto[] = [
      { items: [], name: 'mem' },
      { items: [], name: 'lel' },
    ];
    const repoSpy = jest.spyOn(repo, 'save');
    // when
    await service.createBulk(zombieDTOList);
    // then
    expect(repoSpy).toHaveBeenCalled();
    expect(repoSpy).toBeCalledWith(zombieDTOList);
  });

  it('should return updated zombie', async () => {
    // given
    const item = { id: 3, name: 'ak', price: 3 };
    const newItem = { id: 1, name: 'aka', price: 71 };
    const zombieDTO: UpdateZombieDto = {
      items: [newItem],
      name: 'mem',
    };
    const zombie: Zombie = {
      items: [item],
      name: 'lel',
      id: '3',
      createdAt: new Date(),
    };
    jest.spyOn(repo, 'findOne').mockReturnValue(Promise.resolve(zombie));
    jest
      .spyOn(repo, 'save')
      .mockImplementation((entity: Zombie) => Promise.resolve(entity));

    // when
    const updatedZombie = await service.update(zombieDTO.id, zombieDTO);
    // then
    expect(updatedZombie).toStrictEqual({
      items: [newItem, item],
      name: zombieDTO.name,
      id: zombie.id,
      createdAt: zombie.createdAt,
    });
  });

  it('should return zombie items when one has some in inventory', async () => {
    // given
    const item = { id: 3, name: 'ak', price: 3 };
    const zombie: Zombie = {
      items: [item],
      name: 'lel',
      id: '3',
      createdAt: new Date(),
    };
    jest.spyOn(repo, 'findOne').mockReturnValue(Promise.resolve(zombie));

    // when
    const zombieItems = await service.getZombieItems(zombie.id);
    // then
    expect(zombieItems).toStrictEqual(zombie.items);
  });

  it("should return empty list when zombie don't have any", async () => {
    // given
    const zombie: Zombie = {
      items: null,
      name: 'lel',
      id: '3',
      createdAt: new Date(),
    };
    jest.spyOn(repo, 'findOne').mockReturnValue(Promise.resolve(zombie));

    // when
    const zombieItems = await service.getZombieItems(zombie.id);

    // then
    expect(zombieItems).toStrictEqual([]);
  });

  it('should return sum value of zombie items', async () => {
    // given
    const item = { id: 3, name: 'ak', price: 3 };
    const zombie: Zombie = {
      items: [item],
      name: 'lel',
      id: '3',
      createdAt: new Date(),
    };
    jest.spyOn(repo, 'findOne').mockReturnValue(Promise.resolve(zombie));
    const exchangeRateEUR = getExchangeRate('EURO', 'EUR', 4);
    const exchangeRateUSD = getExchangeRate('USD', 'USD', 4);
    jest
      .spyOn(exchangeRateService, 'getDailyExchangeRates')
      .mockImplementation(() =>
        Promise.resolve([exchangeRateEUR, exchangeRateUSD]),
      );
    // when
    const value = await service.getZombieItemsValue(zombie.id);
    // then
    expect(value).toStrictEqual({ EUR: 12, USD: 12, PLN: 3 });
  });
});
