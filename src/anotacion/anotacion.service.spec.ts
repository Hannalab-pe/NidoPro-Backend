import { Test, TestingModule } from '@nestjs/testing';
import { AnotacionService } from './anotacion.service';

describe('AnotacionService', () => {
  let service: AnotacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnotacionService],
    }).compile();

    service = module.get<AnotacionService>(AnotacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
