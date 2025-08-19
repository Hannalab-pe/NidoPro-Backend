import { IsString, IsOptional, MaxLength, IsNumberString, IsDateString } from 'class-validator';

export class CreatePensionDto {
    @IsOptional()
    @IsString()
    @MaxLength(50)
    tipoPago?: string;

    @IsOptional()
    @IsNumberString()
    monto?: string;

    @IsOptional()
    @IsDateString()
    fechaEmision?: string;

    @IsOptional()
    @IsDateString()
    fechaPago?: string;

    @IsOptional()
    @IsNumberString()
    ingreso?: string;

    @IsOptional()
    @IsNumberString()
    egreso?: string;

    @IsOptional()
    idMatricula?: string;
}
