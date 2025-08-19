import { IsString, IsOptional, MaxLength, IsEmail } from 'class-validator';

export class CreatePadreDto {
    @IsString()
    @MaxLength(100)
    nombre: string;

    @IsString()
    @MaxLength(100)
    apellido: string;

    @IsOptional()
    @IsString()
    direccion?: string;

    @IsOptional()
    @IsString()
    @MaxLength(20)
    telefono?: string;

    @IsOptional()
    @IsEmail()
    @MaxLength(100)
    email?: string;
}
