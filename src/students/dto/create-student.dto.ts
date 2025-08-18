import { IsString, IsEmail, IsNotEmpty, IsOptional, IsDateString, IsIn, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ParentInfoDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  documentNumber: string;

  @IsString()
  @IsOptional()
  documentType?: string = 'DNI';

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsIn(['padre', 'madre', 'tutor', 'abuelo', 'tio', 'otro'])
  relationshipType: 'padre' | 'madre' | 'tutor' | 'abuelo' | 'tio' | 'otro';

  @IsOptional()
  isPrimaryContact?: boolean = false;

  @IsOptional()
  canPickup?: boolean = true;
}

export class CreateStudentDto {
  // Datos del estudiante
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
  @IsNotEmpty()
  birthDate: Date;

  @IsString()
  @IsOptional()
  @IsIn(['M', 'F', 'Otro'])
  gender?: 'M' | 'F' | 'Otro';

  @IsString()
  @IsOptional()
  phone?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  emergencyContact?: string;

  @IsString()
  @IsOptional()
  emergencyPhone?: string;

  // Datos académicos
  @IsNumber()
  @IsNotEmpty()
  gradeId: number;

  @IsString()
  @IsOptional()
  studentCode?: string;

  @IsDateString()
  @IsOptional()
  enrollmentDate?: Date;

  @IsString()
  @IsOptional()
  @IsIn(['active', 'inactive', 'transferred', 'graduated'])
  status?: 'active' | 'inactive' | 'transferred' | 'graduated' = 'active';

  @IsNumber()
  @IsOptional()
  academicYear?: number;

  @IsString()
  @IsOptional()
  observations?: string;

  // Datos de los padres
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ParentInfoDto)
  parents: ParentInfoDto[];
}