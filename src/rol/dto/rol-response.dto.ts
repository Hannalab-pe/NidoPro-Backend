import { Expose } from 'class-transformer';

export class RolResponseDto {
  @Expose()
  idrol: number;

  @Expose()
  nombre: string;

  @Expose()
  descripcion?: string;

  @Expose()
  creado: Date;

  @Expose()
  actualizado: Date;
}
