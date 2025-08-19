import { Module } from '@nestjs/common';
import { AnotacionService } from './anotacion.service';
import { AnotacionController } from './anotacion.controller';

@Module({
  controllers: [AnotacionController],
  providers: [AnotacionService],
})
export class AnotacionModule {}
