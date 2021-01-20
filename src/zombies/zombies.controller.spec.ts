import { Test, TestingModule } from '@nestjs/testing';
import { ZombiesController } from './zombies.controller';
import { ZombiesService } from './zombies.service';
import { Zombie } from './entities/zombie.entity';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import * as request from 'supertest';
import { ItemsService } from '../items/items.service';

describe('ZombiesController', () => {
  let controller: ZombiesController;
  let zombiesService: ZombiesService;
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ZombiesController],
      providers: [
        {
          provide: ZombiesService,
          useValue: {
            create: jest.fn(),
            createBulk: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            updateBulk: jest.fn(),
            remove: jest.fn(),
            removeBulk: jest.fn(),
            getZombieItems: jest.fn(),
            getNumberOfItems: jest.fn(),
            getZombieItemsValue: jest.fn(),
          },
        },
        {
          provide: ItemsService,
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();
    app = module.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
    controller = module.get<ZombiesController>(ZombiesController);
    zombiesService = module.get<ZombiesService>(ZombiesService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return zombie with given ID', async () => {
    // given
    const zombie: Zombie = {
      id: 'asd',
      name: 'asd',
      items: [],
      createdAt: new Date(),
    };
    jest
      .spyOn(zombiesService, 'findOne')
      .mockReturnValue(Promise.resolve(zombie));
    // when
    const zombieFromController = await controller.findOne(zombie.id);
    // then
    expect(zombieFromController).toStrictEqual(zombie);
  });

  it("should return 404 when zombie with provided ID doesn't exists", async () => {
    // given
    jest
      .spyOn(zombiesService, 'findOne')
      .mockReturnValue(Promise.resolve(null));
    // when
    // then
    await request(app.getHttpServer())
      .get('/zombies/3')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(HttpStatus.NOT_FOUND);
  });

  it('should return BAD REQUEST on POST when zombie has more than 5 items', async () => {
    // given
    const zombie = {
      name: '123',
      items: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }],
    };
    // when
    // then
    await request(app.getHttpServer())
      .post('/zombies')
      .send(zombie)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(HttpStatus.BAD_REQUEST);
  });

  it('should return BAD REQUEST on BULK POST when zombie has more than 5 items', async () => {
    // given
    const zombie = {
      name: '123',
      items: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }],
    };
    // when
    // then
    await request(app.getHttpServer())
      .post('/zombies/bulk')
      .send({ zombies: [zombie] })
      .set('Accept', 'application/json')
      .expect(HttpStatus.BAD_REQUEST);
  });

  it('should return BAD REQUEST when trying to update zombie with empty request', async () => {
    // given
    // when
    // then
    await request(app.getHttpServer())
      .post('/zombies/bulk')
      .send({})
      .set('Accept', 'application/json')
      .expect(HttpStatus.BAD_REQUEST);
  });
  it("should return NOT FOUND when trying to update zombie that doesn't exists", async () => {
    // given
    jest
      .spyOn(zombiesService, 'findOne')
      .mockReturnValue(Promise.resolve(null));
    // when
    // then
    await request(app.getHttpServer())
      .patch('/zombies/132')
      .send({ name: 'kek' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(HttpStatus.NOT_FOUND);
  });
});
