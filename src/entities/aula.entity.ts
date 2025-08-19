import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Actividad } from "./actividad.entity";
import { Asistencia } from "./asistencia.entity";
import { Grado } from "./grado.entity";
import { Trabajador } from "./trabajador.entity";
import { Curso } from "./curso.entity";
import { Matricula } from "./matricula.entity";

@Index("aula_pkey", ["idAula"], { unique: true })
@Entity("aula", { schema: "public" })
export class Aula {
  @PrimaryGeneratedColumn('uuid', { name: "id_aula" })
  idAula: string;

  @OneToMany(() => Actividad, (actividad) => actividad.idAula)
  actividads: Actividad[];

  @OneToMany(() => Asistencia, (asistencia) => asistencia.idAula)
  asistencias: Asistencia[];

  @ManyToOne(() => Grado, (grado) => grado.aulas)
  @JoinColumn([{ name: "id_grado", referencedColumnName: "idGrado" }])
  idGrado: Grado;

  @ManyToOne(() => Trabajador, (trabajador) => trabajador.aulas)
  @JoinColumn([{ name: "id_trabajador", referencedColumnName: "idTrabajador" }])
  idTrabajador: Trabajador;

  @OneToMany(() => Curso, (curso) => curso.idAula)
  cursos: Curso[];

  @OneToMany(() => Matricula, (matricula) => matricula.idAula)
  matriculas: Matricula[];
}
