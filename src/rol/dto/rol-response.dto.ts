import { Expose } from 'class-transformer';

export class RolResponseDto {
    @Expose()
    idrol: string;

    @Expose()
    nombre: string;

    @Expose()
    descripcion?: string;

    @Expose()
    creado: Date;

    @Expose()
    actualizado: Date;
}
