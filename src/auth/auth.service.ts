import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User, Person, Role } from '../entities';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
    private jwtService: JwtService,
  ) { }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { usuario: username, isActive: true },
      relations: ['person', 'role'],
    });

    if (user && await bcrypt.compare(password, user.passwordHash)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.username, loginDto.password);

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = {
      username: user.username,
      sub: user.id,
      role: user.role.name,
      personId: user.personId
    };

    // Actualizar última conexión
    await this.userRepository.update(user.id, {
      lastLogin: new Date()
    });

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role.name,
        person: {
          firstName: user.person.firstName,
          lastName: user.person.lastName,
          email: user.person.email,
        }
      }
    };
  }

  async getProfile(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['person', 'role'],
      select: {
        id: true,
        usuario: true,
        email: true,
        lastLogin: true,
        trabajador: {
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
        },
        role: {
          name: true,
          description: true,
        }
      }
    });

    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    return user;
  }
}