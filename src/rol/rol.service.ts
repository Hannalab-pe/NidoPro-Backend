import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class RolService {

  constructor(@InjectRepository(Rol) private rolRepository: Repository<Rol>) { }

  async create(createRolDto: CreateRolDto): Promise<Rol> {
    if (!createRolDto.nombre || !createRolDto.descripcion) {
      throw new Error('Nombre y Descripcion son requeridos'); 
    }
    
    const newRol = this.rolRepository.create(createRolDto);
    return await this.rolRepository.save(newRol);
  }

  async findAll(): Promise<Rol[]> {
    if (!this.rolRepository) {
      throw new Error('Rol repository not initialized');
    }
    return await this.rolRepository.find();
  }

  async findOne(id: string): Promise<Rol | null> {
    if (!id) {
      throw new Error('ID es requerido');
    }
    return await this.rolRepository.findOne({where: { idrol: id }});
  }

  async update(id: string, updateRolDto: UpdateRolDto): Promise<Rol> {
    const rolEncontrado = await this.findOne(id);
    if (!rolEncontrado) {
      throw new NotFoundException(`Rol con ID ${id} no encontrado`);
    }

    const rolActualizado = await this.rolRepository.save({ ...rolEncontrado, ...updateRolDto });
    return rolActualizado;
  }

  remove(id: number) {
    return `This action removes a #${id} rol`;
  }
}
