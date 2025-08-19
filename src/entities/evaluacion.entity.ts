import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Curso } from "./curso.entity";
import { Notas } from "./notas.entity";

@Index("evaluacion_pkey", ["idEvaluacion"], { unique: true })
@Entity("evaluacion", { schema: "public" })
export class Evaluacion {
  @PrimaryGeneratedColumn('uuid',{ name: "id_evaluacion" })
  idEvaluacion: number;

  @Column("text", { name: "descripcion", nullable: true })
  descripcion: string | null;

  @Column("date", { name: "fecha", nullable: true })
  fecha: string | null;

  @ManyToOne(() => Curso, (curso) => curso.evaluacions)
  @JoinColumn([{ name: "id_curso", referencedColumnName: "idCurso" }])
  idCurso: Curso;

  @OneToMany(() => Notas, (notas) => notas.idEvaluacion)
  notas: Notas[];
}
