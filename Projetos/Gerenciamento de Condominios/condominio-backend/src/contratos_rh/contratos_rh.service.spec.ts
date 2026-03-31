import { Test, TestingModule } from '@nestjs/testing';
import { ContratosRhService } from './contratos_rh.service';

describe('ContratosRhService', () => {
  let service: ContratosRhService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContratosRhService],
    }).compile();

    service = module.get<ContratosRhService>(ContratosRhService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
