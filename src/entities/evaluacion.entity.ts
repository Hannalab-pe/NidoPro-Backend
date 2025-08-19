import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Curso } from "./curso.entity";

@Index("evaluaciones_pkey", ["idEvaluacion"], { unique: true })
@Entity("evaluaciones", { schema: "public" })
export class Evaluaciones {
  @Column("uuid", {
    primary: true,
    name: "id_evaluacion",
    default: () => "uuid_generate_v4()",
  })
  idEvaluacion: string;

  @Column("text", { name: "descripcion", nullable: true })
  descripcion: string | null;

  @Column("date", { name: "fecha_evaluacion", nullable: true })
  fechaEvaluacion: string | null;

  @ManyToOne(() => Curso, (curso) => curso.evaluaciones)
  @JoinColumn([{ name: "id_curso", referencedColumnName: "idCurso" }])
  idCurso: Curso;
}
