import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Estudiante } from "./estudiante.entity";
import { Curso } from "./curso.entity";

@Index("notas_pkey", ["idNotas"], { unique: true })
@Entity("notas", { schema: "public" })
export class Notas {
  @Column("uuid", {
    primary: true,
    name: "id_notas",
    default: () => "uuid_generate_v4()",
  })
  idNotas: string;

  @Column("numeric", {
    name: "puntaje",
    nullable: true,
    precision: 5,
    scale: 2,
  })
  puntaje: string | null;

  @Column("text", { name: "observacion", nullable: true })
  observacion: string | null;

  @Column("uuid", { name: "id_evaluacion", nullable: true })
  idEvaluacion: string | null;

  @ManyToOne(() => Estudiante, (estudiante) => estudiante.notas)
  @JoinColumn([{ name: "estudiante_id", referencedColumnName: "idEstudiante" }])
  estudiante: Estudiante;

  @ManyToOne(() => Curso, (curso) => curso.notas)
  @JoinColumn([{ name: "id_curso", referencedColumnName: "idCurso" }])
  idCurso: Curso;
}
