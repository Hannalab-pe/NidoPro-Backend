import { IsString, IsEmail, IsNotEmpty, MinLength, IsOptional, IsDateString, IsIn, IsNumber } from 'class-validator';

export class CreateUserDto {
  // Datos de la persona
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsOptional()
  documentType?: string = 'DNI';

  @IsString()
  @IsNotEmpty()
  documentNumber: string;

  @IsDateString()
  @IsOptional()
  birthDate?: Date;

  @IsString()
  @IsOptional()
  @IsIn(['M', 'F', 'Otro'])
  gender?: 'M' | 'F' | 'Otro';

  @IsString()
  @IsOptional()
  phone?: string;

  @IsEmail()
  @IsOptional()
  personEmail?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  emergencyContact?: string;

  @IsString()
  @IsOptional()
  emergencyPhone?: string;

  // Datos del usuario
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsNumber()
  @IsNotEmpty()
  roleId: number;
}