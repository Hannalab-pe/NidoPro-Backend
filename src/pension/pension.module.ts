import { Module } from '@nestjs/common';
import { PensionService } from './pension.service';
import { PensionController } from './pension.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pension } from 'src/entities';

@Module({
    imports: [TypeOrmModule.forFeature([Pension])],
    controllers: [PensionController],
    providers: [PensionService],
})
export class PensionModule { }
