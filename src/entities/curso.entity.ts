import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Aula } from "./aula.entity";
import { Trabajador } from "./trabajador.entity";
import { Evaluaciones } from "./evaluacion.entity";
import { Notas } from "./notas.entity";

@Index("curso_pkey", ["idCurso"], { unique: true })
@Entity("curso", { schema: "public" })
export class Curso {
  @Column("uuid", {
    primary: true,
    name: "id_curso",
    default: () => "uuid_generate_v4()",
  })
  idCurso: string;

  @Column("character varying", { name: "nom_curso", length: 100 })
  nomCurso: string;

  @ManyToOne(() => Aula, (aula) => aula.cursos)
  @JoinColumn([{ name: "id_aula", referencedColumnName: "idAula" }])
  idAula: Aula;

  @ManyToOne(() => Trabajador, (trabajador) => trabajador.cursos)
  @JoinColumn([{ name: "id_trabajador", referencedColumnName: "idtrabajador" }])
  idTrabajador: Trabajador;

  @OneToMany(() => Evaluaciones, (evaluaciones) => evaluaciones.idCurso)
  evaluaciones: Evaluaciones[];

  @OneToMany(() => Notas, (notas) => notas.idCurso)
  notas: Notas[];
}
