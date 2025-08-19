import { Expose } from 'class-transformer';

export class PadreResponseDto {
    @Expose()
    idPadre: string;

    @Expose()
    nombre: string;

    @Expose()
    apellido: string;

    @Expose()
    direccion?: string;

    @Expose()
    telefono?: string;

    @Expose()
    email?: string;

    @Expose()
    creado: Date;

    @Expose()
    actualizado: Date;
}
