import { Test, TestingModule } from '@nestjs/testing';
import { AnotacionController } from './anotacion.controller';
import { AnotacionService } from './anotacion.service';

describe('AnotacionController', () => {
  let controller: AnotacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnotacionController],
      providers: [AnotacionService],
    }).compile();

    controller = module.get<AnotacionController>(AnotacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
