import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateGradeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  level: string; // 'inicial', 'primaria', 'secundaria'

  @IsString()
  @IsOptional()
  ageGroup?: string; // '3 años', '4 años', '5 años', etc.

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean = true;
}