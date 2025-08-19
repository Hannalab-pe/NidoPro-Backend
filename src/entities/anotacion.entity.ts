import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Estudiante } from "./estudiante.entity";
import { TipoAnotacion } from "./tipo-anotacion.entity";
import { Trabajador } from "./trabajador.entity";

@Index("anotacion_pkey", ["idAnotacion"], { unique: true })
@Entity("anotacion", { schema: "public" })
export class Anotacion {
  @PrimaryGeneratedColumn('uuid',{ name: "id_anotacion" })
  idAnotacion: string;

  @Column("text", { name: "descripcion", nullable: true })
  descripcion: string | null;

  @Column("date", { name: "fecha_registro", nullable: true })
  fechaRegistro: string | null;

  @ManyToOne(() => Estudiante, (estudiante) => estudiante.anotacions)
  @JoinColumn([{ name: "id_estudiante", referencedColumnName: "idEstudiante" }])
  idEstudiante: Estudiante;

  @ManyToOne(() => TipoAnotacion, (tipoAnotacion) => tipoAnotacion.anotacions)
  @JoinColumn([
    { name: "id_tipo_anotacion", referencedColumnName: "idTipoAnotacion" },
  ])
  idTipoAnotacion: TipoAnotacion;

  @ManyToOne(() => Trabajador, (trabajador) => trabajador.anotacions)
  @JoinColumn([{ name: "id_trabajador", referencedColumnName: "idTrabajador" }])
  idTrabajador: Trabajador;
}
