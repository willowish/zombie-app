import { Test, TestingModule } from '@nestjs/testing';
import { ZombiesService } from './zombies.service';

describe('ZombiesService', () => {
  let service: ZombiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ZombiesService],
    }).compile();

    service = module.get<ZombiesService>(ZombiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
