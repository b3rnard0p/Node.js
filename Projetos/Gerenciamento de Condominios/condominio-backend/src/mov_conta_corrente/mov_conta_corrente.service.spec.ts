import { Test, TestingModule } from '@nestjs/testing';
import { MovContaCorrenteService } from './mov_conta_corrente.service';

describe('MovContaCorrenteService', () => {
  let service: MovContaCorrenteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovContaCorrenteService],
    }).compile();

    service = module.get<MovContaCorrenteService>(MovContaCorrenteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
