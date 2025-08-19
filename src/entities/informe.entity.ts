import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Estudiante } from "./estudiante.entity";
import { Trabajador } from "./trabajador.entity";

@Index("informe_pkey", ["idInforme"], { unique: true })
@Entity("informe", { schema: "public" })
export class Informe {
  @PrimaryGeneratedColumn('uuid', { name: "id_informe" })
  idInforme: string;

  @Column("text", { name: "detalle", nullable: true })
  detalle: string | null;

  @Column("date", { name: "fecha_registro", nullable: true })
  fechaRegistro: string | null;

  @ManyToOne(() => Estudiante, (estudiante) => estudiante.informes)
  @JoinColumn([{ name: "id_estudiante", referencedColumnName: "idEstudiante" }])
  idEstudiante: Estudiante;

  @ManyToOne(() => Trabajador, (trabajador) => trabajador.informes)
  @JoinColumn([{ name: "id_trabajador", referencedColumnName: "idTrabajador" }])
  idTrabajador: Trabajador;
}
