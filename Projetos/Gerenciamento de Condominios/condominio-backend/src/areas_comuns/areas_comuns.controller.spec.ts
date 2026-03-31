import { Test, TestingModule } from '@nestjs/testing';
import { AreasComunsController } from './areas_comuns.controller';

describe('AreasComunsController', () => {
  let controller: AreasComunsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AreasComunsController],
    }).compile();

    controller = module.get<AreasComunsController>(AreasComunsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
