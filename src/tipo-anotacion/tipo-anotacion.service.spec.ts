import { Test, TestingModule } from '@nestjs/testing';
import { TipoAnotacionService } from './tipo-anotacion.service';

describe('TipoAnotacionService', () => {
  let service: TipoAnotacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipoAnotacionService],
    }).compile();

    service = module.get<TipoAnotacionService>(TipoAnotacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
