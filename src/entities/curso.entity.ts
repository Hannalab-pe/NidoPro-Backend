import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Aula } from "./aula.entity";
import { Trabajador } from "./trabajador.entity";
import { Evaluacion } from "./evaluacion.entity";
import { Notas } from "./notas.entity";

@Index("curso_pkey", ["idCurso"], { unique: true })
@Entity("curso", { schema: "public" })
export class Curso {
  @PrimaryGeneratedColumn('uuid', { name: "id_curso" })
  idCurso: number;

  @Column("character varying", { name: "nombre", nullable: true, length: 100 })
  nombre: string | null;

  @ManyToOne(() => Aula, (aula) => aula.cursos)
  @JoinColumn([{ name: "id_aula", referencedColumnName: "idAula" }])
  idAula: Aula;

  @ManyToOne(() => Trabajador, (trabajador) => trabajador.cursos)
  @JoinColumn([{ name: "id_trabajador", referencedColumnName: "idTrabajador" }])
  idTrabajador: Trabajador;

  @OneToMany(() => Evaluacion, (evaluacion) => evaluacion.idCurso)
  evaluacions: Evaluacion[];

  @OneToMany(() => Notas, (notas) => notas.idCurso)
  notas: Notas[];
}
