import { Test, TestingModule } from '@nestjs/testing';
import { EtapasDesarrolloController } from './etapas_desarrollo.controller';

describe('EtapasDesarrolloController', () => {
  let controller: EtapasDesarrolloController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EtapasDesarrolloController],
    }).compile();

    controller = module.get<EtapasDesarrolloController>(EtapasDesarrolloController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
