import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Aula } from "./aula.entity";
import { Estudiante } from "./estudiante.entity";

@Index("asistencia_pkey", ["idAsistencia"], { unique: true })
@Entity("asistencia", { schema: "public" })
export class Asistencia {
  @Column("uuid", {
    primary: true,
    name: "id_asistencia",
    default: () => "uuid_generate_v4()",
  })
  idAsistencia: string;

  @Column("date", { name: "fecha", nullable: true })
  fecha: string | null;

  @Column("time without time zone", { name: "hora", nullable: true })
  hora: string | null;

  @Column("boolean", { name: "asistio", nullable: true })
  asistio: boolean | null;

  @Column("text", { name: "observacion", nullable: true })
  observacion: string | null;

  @ManyToOne(() => Aula, (aula) => aula.asistencias)
  @JoinColumn([{ name: "aula_id", referencedColumnName: "idAula" }])
  aula: Aula;

  @ManyToOne(() => Estudiante, (estudiante) => estudiante.asistencias)
  @JoinColumn([{ name: "estudiante_id", referencedColumnName: "idEstudiante" }])
  estudiante: Estudiante;
}
