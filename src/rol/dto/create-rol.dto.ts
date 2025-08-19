import { IsString, IsOptional, MaxLength } from 'class-validator';

export class CreateRolDto {
    @IsString()
    @MaxLength(50)
    nombre: string;

    @IsOptional()
    @IsString()
    descripcion?: string;

    @IsOptional()
    isActive?: boolean;
}
