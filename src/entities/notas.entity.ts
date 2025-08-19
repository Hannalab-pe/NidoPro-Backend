import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Curso } from "./curso.entity";
import { Estudiante } from "./estudiante.entity";
import { Evaluacion } from "./evaluacion.entity";

@Index("notas_pkey", ["idNota"], { unique: true })
@Entity("notas", { schema: "public" })
export class Notas {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_nota" })
  idNota: number;

  @Column("numeric", {
    name: "puntaje",
    nullable: true,
    precision: 5,
    scale: 2,
  })
  puntaje: string | null;

  @Column("text", { name: "observacion", nullable: true })
  observacion: string | null;

  @ManyToOne(() => Curso, (curso) => curso.notas)
  @JoinColumn([{ name: "id_curso", referencedColumnName: "idCurso" }])
  idCurso: Curso;

  @ManyToOne(() => Estudiante, (estudiante) => estudiante.notas)
  @JoinColumn([{ name: "id_estudiante", referencedColumnName: "idEstudiante" }])
  idEstudiante: Estudiante;

  @ManyToOne(() => Evaluacion, (evaluacion) => evaluacion.notas)
  @JoinColumn([{ name: "id_evaluacion", referencedColumnName: "idEvaluacion" }])
  idEvaluacion: Evaluacion;
}
