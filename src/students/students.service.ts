import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';

import { Student, Person, Grade, ParentStudent } from '../entities';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
    @InjectRepository(Grade)
    private gradeRepository: Repository<Grade>,
    @InjectRepository(ParentStudent)
    private parentStudentRepository: Repository<ParentStudent>,
    private dataSource: DataSource,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    // Verificar si el documento ya existe
    const existingDocument = await this.personRepository.findOne({
      where: { documentNumber: createStudentDto.documentNumber }
    });
    if (existingDocument) {
      throw new ConflictException('Ya existe una persona con ese número de documento');
    }

    // Verificar que el grado existe
    const grade = await this.gradeRepository.findOne({
      where: { id: createStudentDto.gradeId }
    });
    if (!grade) {
      throw new NotFoundException('Grado no encontrado');
    }

    // Usar transacción para crear estudiante y padres
    return await this.dataSource.transaction(async manager => {
      // 1. Crear la persona del estudiante
      const studentPerson = manager.create(Person, {
        firstName: createStudentDto.firstName,
        lastName: createStudentDto.lastName,
        documentType: createStudentDto.documentType,
        documentNumber: createStudentDto.documentNumber,
        birthDate: createStudentDto.birthDate,
        gender: createStudentDto.gender,
        phone: createStudentDto.phone,
        email: createStudentDto.email,
        address: createStudentDto.address,
        emergencyContact: createStudentDto.emergencyContact,
        emergencyPhone: createStudentDto.emergencyPhone,
      });

      const savedStudentPerson = await manager.save(Person, studentPerson);

      // 2. Generar código de estudiante si no se proporciona
      let studentCode = createStudentDto.studentCode;
      if (!studentCode) {
        const year = new Date().getFullYear();
        const count = await manager.count(Student);
        studentCode = `EST${year}${String(count + 1).padStart(4, '0')}`;
      }

      // 3. Crear el estudiante
      const student = manager.create(Student, {
        personId: savedStudentPerson.id,
        gradeId: createStudentDto.gradeId,
        studentCode,
        enrollmentDate: createStudentDto.enrollmentDate || new Date(),
        status: createStudentDto.status || 'active',
        academicYear: createStudentDto.academicYear || new Date().getFullYear(),
        observations: createStudentDto.observations,
      });

      const savedStudent = await manager.save(Student, student);

      // 4. Crear o encontrar padres y establecer relaciones
      for (const parentInfo of createStudentDto.parents) {
        // Buscar si el padre ya existe
        let parentPerson = await manager.findOne(Person, {
          where: { documentNumber: parentInfo.documentNumber }
        });

        if (!parentPerson) {
          // Crear nuevo padre
          parentPerson = manager.create(Person, {
            firstName: parentInfo.firstName,
            lastName: parentInfo.lastName,
            documentType: parentInfo.documentType,
            documentNumber: parentInfo.documentNumber,
            email: parentInfo.email,
            phone: parentInfo.phone,
            address: parentInfo.address,
          });
          parentPerson = await manager.save(Person, parentPerson);
        }

        // Crear relación padre-estudiante
        const parentStudent = manager.create(ParentStudent, {
          parentId: parentPerson.id,
          studentId: savedStudent.id,
          relationshipType: parentInfo.relationshipType,
          isPrimaryContact: parentInfo.isPrimaryContact,
          canPickup: parentInfo.canPickup,
        });

        await manager.save(ParentStudent, parentStudent);
      }

      return savedStudent.id;
    });
  }

  async findAll(gradeId?: number, status?: string) {
    const queryBuilder = this.studentRepository
      .createQueryBuilder('student')
      .leftJoinAndSelect('student.person', 'person')
      .leftJoinAndSelect('student.grade', 'grade')
      .leftJoinAndSelect('student.parents', 'parentStudent')
      .leftJoinAndSelect('parentStudent.parent', 'parent')
      .orderBy('person.firstName', 'ASC');

    if (gradeId) {
      queryBuilder.andWhere('student.gradeId = :gradeId', { gradeId });
    }

    if (status) {
      queryBuilder.andWhere('student.status = :status', { status });
    } else {
      queryBuilder.andWhere('student.status = :status', { status: 'active' });
    }

    return queryBuilder.getMany();
  }

  async findOne(id: number) {
    const student = await this.studentRepository.findOne({
      where: { id },
      relations: [
        'person', 
        'grade', 
        'parents', 
        'parents.parent'
      ]
    });

    if (!student) {
      throw new NotFoundException('Estudiante no encontrado');
    }

    return student;
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    const student = await this.findOne(id);

    // Verificar documento único si se está actualizando
    if (updateStudentDto.documentNumber && updateStudentDto.documentNumber !== student.person.documentNumber) {
      const existingDocument = await this.personRepository.findOne({
        where: { documentNumber: updateStudentDto.documentNumber }
      });
      if (existingDocument) {
        throw new ConflictException('Ya existe una persona con ese número de documento');
      }
    }

    // Verificar grado si se está actualizando
    if (updateStudentDto.gradeId && updateStudentDto.gradeId !== student.gradeId) {
      const grade = await this.gradeRepository.findOne({
        where: { id: updateStudentDto.gradeId }
      });
      if (!grade) {
        throw new NotFoundException('Grado no encontrado');
      }
    }

    await this.dataSource.transaction(async manager => {
      // Actualizar datos de la persona
      await manager.update(Person, student.person.id, {
        firstName: updateStudentDto.firstName,
        lastName: updateStudentDto.lastName,
        documentType: updateStudentDto.documentType,
        documentNumber: updateStudentDto.documentNumber,
        birthDate: updateStudentDto.birthDate,
        gender: updateStudentDto.gender,
        phone: updateStudentDto.phone,
        email: updateStudentDto.email,
        address: updateStudentDto.address,
        emergencyContact: updateStudentDto.emergencyContact,
        emergencyPhone: updateStudentDto.emergencyPhone,
      });

      // Actualizar datos del estudiante
      await manager.update(Student, id, {
        gradeId: updateStudentDto.gradeId,
        studentCode: updateStudentDto.studentCode,
        enrollmentDate: updateStudentDto.enrollmentDate,
        status: updateStudentDto.status,
        academicYear: updateStudentDto.academicYear,
        observations: updateStudentDto.observations,
      });
    });

    return this.findOne(id);
  }

  async remove(id: number) {
    const student = await this.findOne(id);
    
    // Soft delete
    await this.studentRepository.update(id, { status: 'inactive' });
    await this.personRepository.update(student.person.id, { isActive: false });

    return { message: 'Estudiante desactivado correctamente' };
  }

  async findByGrade(gradeId: number) {
    return this.studentRepository.find({
      where: { 
        gradeId, 
        status: 'active' 
      },
      relations: ['person', 'grade'],
      order: { 
        person: { firstName: 'ASC' } 
      }
    });
  }

  async findByParent(parentDocumentNumber: string) {
    const parent = await this.personRepository.findOne({
      where: { documentNumber: parentDocumentNumber }
    });

    if (!parent) {
      throw new NotFoundException('Padre no encontrado');
    }

    const parentStudents = await this.parentStudentRepository.find({
      where: { parentId: parent.id },
      relations: ['student', 'student.person', 'student.grade']
    });

    return parentStudents.map(ps => ps.student);
  }

  async searchStudents(searchTerm: string) {
    return this.studentRepository
      .createQueryBuilder('student')
      .leftJoinAndSelect('student.person', 'person')
      .leftJoinAndSelect('student.grade', 'grade')
      .where('person.firstName ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` })
      .orWhere('person.lastName ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` })
      .orWhere('person.documentNumber ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` })
      .orWhere('student.studentCode ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` })
      .andWhere('student.status = :status', { status: 'active' })
      .orderBy('person.firstName', 'ASC')
      .getMany();
  }
}