import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Subject } from '../entities';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subject)
    private subjectRepository: Repository<Subject>,
  ) {}

  async create(createSubjectDto: CreateSubjectDto) {
    // Verificar si el nombre ya existe
    const existingSubject = await this.subjectRepository.findOne({
      where: { name: createSubjectDto.name }
    });
    if (existingSubject) {
      throw new ConflictException('Ya existe una materia con ese nombre');
    }

    // Verificar si el código ya existe (si se proporciona)
    if (createSubjectDto.code) {
      const existingCode = await this.subjectRepository.findOne({
        where: { code: createSubjectDto.code }
      });
      if (existingCode) {
        throw new ConflictException('Ya existe una materia con ese código');
      }
    }

    const subject = this.subjectRepository.create(createSubjectDto);
    return this.subjectRepository.save(subject);
  }

  async findAll() {
    return this.subjectRepository.find({
      where: { isActive: true },
      order: { name: 'ASC' }
    });
  }

  async findOne(id: number) {
    const subject = await this.subjectRepository.findOne({
      where: { id }
    });

    if (!subject) {
      throw new NotFoundException('Materia no encontrada');
    }

    return subject;
  }

  async update(id: number, updateSubjectDto: UpdateSubjectDto) {
    const subject = await this.findOne(id);

    // Verificar nombre único si se está actualizando
    if (updateSubjectDto.name && updateSubjectDto.name !== subject.name) {
      const existingSubject = await this.subjectRepository.findOne({
        where: { name: updateSubjectDto.name }
      });
      if (existingSubject) {
        throw new ConflictException('Ya existe una materia con ese nombre');
      }
    }

    // Verificar código único si se está actualizando
    if (updateSubjectDto.code && updateSubjectDto.code !== subject.code) {
      const existingCode = await this.subjectRepository.findOne({
        where: { code: updateSubjectDto.code }
      });
      if (existingCode) {
        throw new ConflictException('Ya existe una materia con ese código');
      }
    }

    await this.subjectRepository.update(id, updateSubjectDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const subject = await this.findOne(id);
    
    // Soft delete
    await this.subjectRepository.update(id, { isActive: false });
    return { message: 'Materia desactivada correctamente' };
  }

  async findByName(searchTerm: string) {
    return this.subjectRepository
      .createQueryBuilder('subject')
      .where('subject.name ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` })
      .andWhere('subject.isActive = :isActive', { isActive: true })
      .orderBy('subject.name', 'ASC')
      .getMany();
  }
}