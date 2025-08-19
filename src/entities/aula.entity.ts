import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Actividades } from "./actividades.entity";
import { Asistencia } from "./asistencia.entity";
import { Grado } from "./grado.entity";
import { Trabajador } from "./trabajador.entity";
import { Curso } from "./curso.entity";

@Index("aula_pkey", ["idAula"], { unique: true })
@Entity("aula", { schema: "public" })
export class Aula {
  @Column("uuid", {
    primary: true,
    name: "id_aula",
    default: () => "uuid_generate_v4()",
  })
  idAula: string;

  @OneToMany(() => Actividades, (actividades) => actividades.aula)
  actividades: Actividades[];

  @OneToMany(() => Asistencia, (asistencia) => asistencia.aula)
  asistencias: Asistencia[];

  @ManyToOne(() => Grado, (grado) => grado.aulas)
  @JoinColumn([{ name: "id_grado", referencedColumnName: "idgrado" }])
  idGrado: Grado;

  @ManyToOne(() => Trabajador, (trabajador) => trabajador.aulas)
  @JoinColumn([{ name: "id_trabajador", referencedColumnName: "idtrabajador" }])
  idTrabajador: Trabajador;

  @OneToMany(() => Curso, (curso) => curso.idAula)
  cursos: Curso[];
}
