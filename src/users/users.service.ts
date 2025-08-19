import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User, Person, Role } from '../entities';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    // Verificar si el username ya existe
    const existingUser = await this.userRepository.findOne({
      where: { usuario: createUserDto.username }
    });
    if (existingUser) {
      throw new ConflictException('El nombre de usuario ya existe');
    }

    // Verificar si el email ya existe
    const existingEmail = await this.userRepository.findOne({
      where: { email: createUserDto.email }
    });
    if (existingEmail) {
      throw new ConflictException('El email ya existe');
    }

    // Verificar si el documento ya existe
    const existingDocument = await this.personRepository.findOne({
      where: { documentNumber: createUserDto.documentNumber }
    });
    if (existingDocument) {
      throw new ConflictException('El número de documento ya existe');
    }

    // Verificar que el rol existe
    const role = await this.roleRepository.findOne({
      where: { id: createUserDto.roleId }
    });
    if (!role) {
      throw new NotFoundException('Rol no encontrado');
    }

    // Crear la persona
    const person = this.personRepository.create({
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      documentType: createUserDto.documentType,
      documentNumber: createUserDto.documentNumber,
      birthDate: createUserDto.birthDate,
      gender: createUserDto.gender,
      phone: createUserDto.phone,
      email: createUserDto.personEmail || createUserDto.email,
      address: createUserDto.address,
      emergencyContact: createUserDto.emergencyContact,
      emergencyPhone: createUserDto.emergencyPhone,
    });

    const savedPerson = await this.personRepository.save(person);

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // Crear el usuario
    const user = this.userRepository.create({
      trabajadorId: savedPerson.id,
      roleId: createUserDto.roleId,
      usuario: createUserDto.username,
      email: createUserDto.email,
      passwordHash: hashedPassword,
    });

    const savedUser = await this.userRepository.save(user);

    // Retornar el usuario sin la contraseña
    return this.findOne(savedUser.id);
  }

  async findAll() {
    return this.userRepository.find({
      relations: ['person', 'role'],
      select: {
        id: true,
        usuario: true,
        email: true,
        isActive: true,
        lastLogin: true,
        createdAt: true,
        trabajador: {
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          documentNumber: true,
        },
        role: {
          name: true,
          description: true,
        }
      }
    });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['person', 'role'],
      select: {
        id: true,
        usuario: true,
        email: true,
        isActive: true,
        lastLogin: true,
        createdAt: true,
        trabajador: {
          idTrabajador: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          documentNumber: true,
          documentType: true,
          birthDate: true,
          gender: true,
          address: true,
          emergencyContact: true,
          emergencyPhone: true,
        },
        role: {
          id: true,
          name: true,
          description: true,
        }
      }
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    // Verificar username único si se está actualizando
    if (updateUserDto.username && updateUserDto.username !== user.usuario) {
      const existingUser = await this.userRepository.findOne({
        where: { usuario: updateUserDto.username }
      });
      if (existingUser) {
        throw new ConflictException('El nombre de usuario ya existe');
      }
    }

    // Verificar email único si se está actualizando
    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingEmail = await this.userRepository.findOne({
        where: { email: updateUserDto.email }
      });
      if (existingEmail) {
        throw new ConflictException('El email ya existe');
      }
    }

    // Actualizar datos de la persona
    if (updateUserDto.firstName || updateUserDto.lastName || updateUserDto.phone || updateUserDto.address) {
      await this.personRepository.update(user.trabajador.idTrabajador, {
        firstName: updateUserDto.firstName,
        lastName: updateUserDto.lastName,
        phone: updateUserDto.phone,
        email: updateUserDto.personEmail || updateUserDto.email,
        address: updateUserDto.address,
        emergencyContact: updateUserDto.emergencyContact,
        emergencyPhone: updateUserDto.emergencyPhone,
      });
    }

    // Actualizar datos del usuario
    await this.userRepository.update(id, {
      usuario: updateUserDto.username,
      email: updateUserDto.email,
      roleId: updateUserDto.roleId,
    });

    return this.findOne(id);
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    // Soft delete - marcar como inactivo en lugar de eliminar
    await this.userRepository.update(id, { isActive: false });
    await this.personRepository.update(user.trabajador.idTrabajador, { isActive: false });

    return { message: 'Usuario desactivado correctamente' };
  }

  async findByRole(roleName: string) {
    return this.userRepository.find({
      relations: ['person', 'role'],
      where: {
        role: { name: roleName },
        isActive: true
      },
      select: {
        id: true,
        usuario: true,
        email: true,
        trabajador: {
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
        },
        role: {
          name: true,
        }
      }
    });
  }
}