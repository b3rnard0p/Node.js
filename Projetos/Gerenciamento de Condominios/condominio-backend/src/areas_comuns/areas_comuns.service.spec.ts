import { Test, TestingModule } from '@nestjs/testing';
import { AreasComunsService } from './areas_comuns.service';

describe('AreasComunsService', () => {
  let service: AreasComunsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AreasComunsService],
    }).compile();

    service = module.get<AreasComunsService>(AreasComunsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
