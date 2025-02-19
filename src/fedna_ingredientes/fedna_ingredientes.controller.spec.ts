import { Test, TestingModule } from '@nestjs/testing';
import { FednaIngredientesController } from './fedna_ingredientes.controller';

describe('FednaIngredientesController', () => {
  let controller: FednaIngredientesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FednaIngredientesController],
    }).compile();

    controller = module.get<FednaIngredientesController>(FednaIngredientesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
