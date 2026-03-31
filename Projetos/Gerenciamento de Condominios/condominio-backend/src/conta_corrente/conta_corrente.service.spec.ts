import { Test, TestingModule } from '@nestjs/testing';
import { ContaCorrenteService } from './conta_corrente.service';

describe('ContaCorrenteService', () => {
  let service: ContaCorrenteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContaCorrenteService],
    }).compile();

    service = module.get<ContaCorrenteService>(ContaCorrenteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
