import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePadreDto } from './dto/create-padre.dto';
import { UpdatePadreDto } from './dto/update-padre.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Padre } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class PadreService {

  constructor(@InjectRepository(Padre) private padreRepository: Repository<Padre>) { }

  async create(createPadreDto: CreatePadreDto): Promise<Padre> {
    if (!createPadreDto.nombre || !createPadreDto.apellido) {
      throw new Error('Nombre y Apellido son requeridos');
    }

    const newPadre = this.padreRepository.create({
      nombre: createPadreDto.nombre,
      apellido: createPadreDto.apellido,
      direccion: createPadreDto.direccion,
      telefono: createPadreDto.telefono,
      email: createPadreDto.email,
    });
    return await this.padreRepository.save(newPadre);
  }

  async findAll(): Promise<Padre[]> {
    if (!this.padreRepository) {
      throw new Error('Padre repository not initialized');
    }
    return await this.padreRepository.find();
  }

  async findOne(id: string): Promise<Padre | null> {
    if (!id) {
      throw new Error('ID es requerido');
    }
    return await this.padreRepository.findOne({ where: { idPadre: id } });
  }

  async update(id: string, updatePadreDto: UpdatePadreDto): Promise<Padre> {
    const padreEncontrado = await this.findOne(id);
    if (!padreEncontrado) {
      throw new NotFoundException(`Padre con ID ${id} no encontrado`);
    }

    // Actualizar solo los campos que se proporcionan
    if (updatePadreDto.nombre !== undefined) padreEncontrado.nombre = updatePadreDto.nombre;
    if (updatePadreDto.apellido !== undefined) padreEncontrado.apellido = updatePadreDto.apellido;
    if (updatePadreDto.direccion !== undefined) padreEncontrado.direccion = updatePadreDto.direccion;
    if (updatePadreDto.telefono !== undefined) padreEncontrado.telefono = updatePadreDto.telefono;
    if (updatePadreDto.email !== undefined) padreEncontrado.email = updatePadreDto.email;

    return await this.padreRepository.save(padreEncontrado);
  }

  remove(id: string) {
    return `This action removes a #${id} padre`;
  }
}
