import { Test, TestingModule } from '@nestjs/testing';
import { ContaCorrenteController } from './conta_corrente.controller';

describe('ContaCorrenteController', () => {
  let controller: ContaCorrenteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContaCorrenteController],
    }).compile();

    controller = module.get<ContaCorrenteController>(ContaCorrenteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
