import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePensionDto } from './dto/create-pension.dto';
import { UpdatePensionDto } from './dto/update-pension.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pago } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class PensionService {

    constructor(@InjectRepository(Pago) private pagoRepository: Repository<Pago>) { }

    async create(createPensionDto: CreatePensionDto): Promise<Pago> {
        if (!createPensionDto.monto) {
            throw new Error('Monto es requerido');
        }

        const newPago = this.pagoRepository.create({
            tipoPago: createPensionDto.tipoPago,
            monto: createPensionDto.monto,
            fechaEmision: createPensionDto.fechaEmision,
            fechaPago: createPensionDto.fechaPago,
            ingreso: createPensionDto.ingreso,
            egreso: createPensionDto.egreso,
        });
        return await this.pagoRepository.save(newPago);
    }

    async findAll(): Promise<Pago[]> {
        if (!this.pagoRepository) {
            throw new Error('Pago repository not initialized');
        }
        return await this.pagoRepository.find();
    }

    async findOne(id: string): Promise<Pago | null> {
        if (!id) {
            throw new Error('ID es requerido');
        }
        return await this.pagoRepository.findOne({ where: { idPago: id } });
    }

    async update(id: string, updatePensionDto: UpdatePensionDto): Promise<Pago> {
        const pagoEncontrado = await this.findOne(id);
        if (!pagoEncontrado) {
            throw new NotFoundException(`Pensión con ID ${id} no encontrada`);
        }

        // Actualizar solo los campos que se proporcionan
        if (updatePensionDto.tipoPago !== undefined) pagoEncontrado.tipoPago = updatePensionDto.tipoPago;
        if (updatePensionDto.monto !== undefined) pagoEncontrado.monto = updatePensionDto.monto;
        if (updatePensionDto.fechaEmision !== undefined) pagoEncontrado.fechaEmision = updatePensionDto.fechaEmision;
        if (updatePensionDto.fechaPago !== undefined) pagoEncontrado.fechaPago = updatePensionDto.fechaPago;
        if (updatePensionDto.ingreso !== undefined) pagoEncontrado.ingreso = updatePensionDto.ingreso;
        if (updatePensionDto.egreso !== undefined) pagoEncontrado.egreso = updatePensionDto.egreso;

        return await this.pagoRepository.save(pagoEncontrado);
    }

    remove(id: string) {
        return `This action removes a #${id} pension`;
    }
}
