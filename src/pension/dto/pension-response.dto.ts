import { Expose } from 'class-transformer';

export class PensionResponseDto {
    @Expose()
    idpension: string;

    @Expose()
    montoPension?: string;

    @Expose()
    fechaEmision?: string;

    @Expose()
    fechaPago?: string;
}
