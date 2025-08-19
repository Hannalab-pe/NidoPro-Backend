import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Aula } from "./aula.entity";
import { Estudiante } from "./estudiante.entity";

@Index("asistencia_pkey", ["idAsistencia"], { unique: true })
@Entity("asistencia", { schema: "public" })
export class Asistencia {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_asistencia" })
  idAsistencia: number;

  @Column("date", { name: "fecha", nullable: true })
  fecha: string | null;

  @Column("time without time zone", { name: "hora", nullable: true })
  hora: string | null;

  @Column("boolean", { name: "asistio", nullable: true })
  asistio: boolean | null;

  @Column("text", { name: "observacion", nullable: true })
  observacion: string | null;

  @ManyToOne(() => Aula, (aula) => aula.asistencias)
  @JoinColumn([{ name: "id_aula", referencedColumnName: "idAula" }])
  idAula: Aula;

  @ManyToOne(() => Estudiante, (estudiante) => estudiante.asistencias)
  @JoinColumn([{ name: "id_estudiante", referencedColumnName: "idEstudiante" }])
  idEstudiante: Estudiante;
}
