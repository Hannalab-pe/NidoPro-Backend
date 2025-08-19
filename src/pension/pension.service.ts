import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePensionDto } from './dto/create-pension.dto';
import { UpdatePensionDto } from './dto/update-pension.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pension } from 'src/entities';

@Injectable()
export class PensionService {

    constructor(@InjectRepository(Pension) private pensionRepository: Repository<Pension>) { }

    async create(createPensionDto: CreatePensionDto): Promise<Pension> {
        if (!createPensionDto.montoPension) {
            throw new Error('Monto de pensión es requerido');
        }

        const newPension = this.pensionRepository.create({
            montoPension: createPensionDto.montoPension,
            fechaEmision: createPensionDto.fechaEmision,
            fechaPago: createPensionDto.fechaPago,
        });
        return await this.pensionRepository.save(newPension);
    }

    async findAll(): Promise<Pension[]> {
        if (!this.pensionRepository) {
            throw new Error('Pension repository not initialized');
        }
        return await this.pensionRepository.find();
    }

    async findOne(id: string): Promise<Pension | null> {
        if (!id) {
            throw new Error('ID es requerido');
        }
        return await this.pensionRepository.findOne({ where: { idpension: id } });
    }

    async update(id: string, updatePensionDto: UpdatePensionDto): Promise<Pension> {
        const pensionEncontrada = await this.findOne(id);
        if (!pensionEncontrada) {
            throw new NotFoundException(`Pensión con ID ${id} no encontrada`);
        }

        // Actualizar solo los campos que se proporcionan
        if (updatePensionDto.montoPension !== undefined) pensionEncontrada.montoPension = updatePensionDto.montoPension;
        if (updatePensionDto.fechaEmision !== undefined) pensionEncontrada.fechaEmision = updatePensionDto.fechaEmision;
        if (updatePensionDto.fechaPago !== undefined) pensionEncontrada.fechaPago = updatePensionDto.fechaPago;

        return await this.pensionRepository.save(pensionEncontrada);
    }

    remove(id: string) {
        return `This action removes a #${id} pension`;
    }
}
