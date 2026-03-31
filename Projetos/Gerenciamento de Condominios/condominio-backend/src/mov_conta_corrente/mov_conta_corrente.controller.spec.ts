import { Test, TestingModule } from '@nestjs/testing';
import { MovContaCorrenteController } from './mov_conta_corrente.controller';

describe('MovContaCorrenteController', () => {
  let controller: MovContaCorrenteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovContaCorrenteController],
    }).compile();

    controller = module.get<MovContaCorrenteController>(MovContaCorrenteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
