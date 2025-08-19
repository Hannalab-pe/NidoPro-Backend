import { Module } from '@nestjs/common';
import { TipoAnotacionService } from './tipo-anotacion.service';
import { TipoAnotacionController } from './tipo-anotacion.controller';

@Module({
  controllers: [TipoAnotacionController],
  providers: [TipoAnotacionService],
})
export class TipoAnotacionModule {}
