import { Test, TestingModule } from '@nestjs/testing';
import { TipoAnotacionController } from './tipo-anotacion.controller';
import { TipoAnotacionService } from './tipo-anotacion.service';

describe('TipoAnotacionController', () => {
  let controller: TipoAnotacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoAnotacionController],
      providers: [TipoAnotacionService],
    }).compile();

    controller = module.get<TipoAnotacionController>(TipoAnotacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
