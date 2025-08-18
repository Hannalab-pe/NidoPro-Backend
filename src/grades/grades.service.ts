import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Grade } from '../entities';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';

@Injectable()
export class GradesService {
  constructor(
    @InjectRepository(Grade)
    private gradeRepository: Repository<Grade>,
  ) {}

  async create(createGradeDto: CreateGradeDto) {
    // Verificar si el nombre ya existe
    const existingGrade = await this.gradeRepository.findOne({
      where: { name: createGradeDto.name }
    });
    if (existingGrade) {
      throw new ConflictException('Ya existe un grado con ese nombre');
    }

    const grade = this.gradeRepository.create(createGradeDto);
    return this.gradeRepository.save(grade);
  }

  async findAll() {
    return this.gradeRepository.find({
      where: { isActive: true },
      relations: ['students'],
      select: {
        id: true,
        name: true,
        level: true,
        ageGroup: true,
        description: true,
        isActive: true,
        createdAt: true,
        students: {
          id: true,
        }
      }
    });
  }

  async findOne(id: number) {
    const grade = await this.gradeRepository.findOne({
      where: { id },
      relations: ['students', 'students.person'],
      select: {
        id: true,
        name: true,
        level: true,
        ageGroup: true,
        description: true,
        isActive: true,
        createdAt: true,
        students: {
          id: true,
          studentCode: true,
          status: true,
          person: {
            firstName: true,
            lastName: true,
          }
        }
      }
    });

    if (!grade) {
      throw new NotFoundException('Grado no encontrado');
    }

    return grade;
  }

  async update(id: number, updateGradeDto: UpdateGradeDto) {
    const grade = await this.findOne(id);

    // Verificar nombre único si se está actualizando
    if (updateGradeDto.name && updateGradeDto.name !== grade.name) {
      const existingGrade = await this.gradeRepository.findOne({
        where: { name: updateGradeDto.name }
      });
      if (existingGrade) {
        throw new ConflictException('Ya existe un grado con ese nombre');
      }
    }

    await this.gradeRepository.update(id, updateGradeDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const grade = await this.findOne(id);
    
    // Verificar si tiene estudiantes activos
    if (grade.students && grade.students.length > 0) {
      throw new ConflictException('No se puede eliminar un grado que tiene estudiantes asignados');
    }

    // Soft delete
    await this.gradeRepository.update(id, { isActive: false });
    return { message: 'Grado desactivado correctamente' };
  }

  async findByLevel(level: string) {
    return this.gradeRepository.find({
      where: { level, isActive: true },
      order: { name: 'ASC' }
    });
  }
}