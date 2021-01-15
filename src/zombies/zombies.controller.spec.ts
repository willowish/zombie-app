import { Test, TestingModule } from '@nestjs/testing';
import { ZombiesController } from './zombies.controller';
import { ZombiesService } from './zombies.service';

describe('ZombiesController', () => {
  let controller: ZombiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ZombiesController],
      providers: [ZombiesService],
    }).compile();

    controller = module.get<ZombiesController>(ZombiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
