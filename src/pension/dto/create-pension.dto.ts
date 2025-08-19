import { IsOptional, IsNumberString, IsDateString } from 'class-validator';

export class CreatePensionDto {
    @IsOptional()
    @IsNumberString()
    montoPension?: string;

    @IsOptional()
    @IsDateString()
    fechaEmision?: string;

    @IsOptional()
    @IsDateString()
    fechaPago?: string;
}
