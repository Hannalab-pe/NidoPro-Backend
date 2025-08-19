import { Expose } from 'class-transformer';

export class PensionResponseDto {
    @Expose()
    idPago: string;

    @Expose()
    tipoPago?: string;

    @Expose()
    monto?: string;

    @Expose()
    fechaEmision?: string;

    @Expose()
    fechaPago?: string;

    @Expose()
    ingreso?: string;

    @Expose()
    egreso?: string;
}
