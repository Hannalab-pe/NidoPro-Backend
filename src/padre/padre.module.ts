import { Module } from '@nestjs/common';
import { PadreService } from './padre.service';
import { PadreController } from './padre.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Padre } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Padre])],
  controllers: [PadreController],
  providers: [PadreService],
})
export class PadreModule { }
