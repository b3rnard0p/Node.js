import { Test, TestingModule } from '@nestjs/testing';
import { ContratosRhController } from './contratos_rh.controller';

describe('ContratosRhController', () => {
  let controller: ContratosRhController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContratosRhController],
    }).compile();

    controller = module.get<ContratosRhController>(ContratosRhController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
