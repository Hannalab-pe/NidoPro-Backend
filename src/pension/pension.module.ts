import { Module } from '@nestjs/common';
import { PensionService } from './pension.service';
import { PensionController } from './pension.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pago } from 'src/entities';

@Module({
    imports: [TypeOrmModule.forFeature([Pago])],
    controllers: [PensionController],
    providers: [PensionService],
})
export class PensionModule { }
