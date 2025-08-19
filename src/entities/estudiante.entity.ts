import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Actividades } from "./actividades.entity";
import { Anotaciones } from "./anotacion.entity";
import { Asistencia } from "./asistencia.entity";
import { Usuario } from "./usuario.entity";
import { Informe } from "./informe.entity";
import { Matricula } from "./matricula.entity";
import { Notas } from "./notas.entity";

@Index("estudiante_pkey", ["idEstudiante"], { unique: true })
@Index("estudiante_nro_documento_key", ["nroDocumento"], { unique: true })
@Entity("estudiante", { schema: "public" })
export class Estudiante {
  @Column("uuid", {
    primary: true,
    name: "id_estudiante",
    default: () => "uuid_generate_v4()",
  })
  idEstudiante: string;

  @Column("character varying", { name: "nombre", length: 100 })
  nombre: string;

  @Column("character varying", { name: "apellido", length: 100 })
  apellido: string;

  @Column("character varying", {
    name: "contacto_emergencia",
    nullable: true,
    length: 100,
  })
  contactoEmergencia: string | null;

  @Column("character varying", {
    name: "nro_emergencia",
    nullable: true,
    length: 20,
  })
  nroEmergencia: string | null;

  @Column("character varying", {
    name: "tipo_documento",
    nullable: true,
    length: 50,
  })
  tipoDocumento: string | null;

  @Column("character varying", {
    name: "nro_documento",
    nullable: true,
    unique: true,
    length: 50,
  })
  nroDocumento: string | null;

  @Column("text", { name: "observaciones", nullable: true })
  observaciones: string | null;

  @OneToMany(() => Actividades, (actividades) => actividades.estudiante)
  actividades: Actividades[];

  @OneToMany(() => Anotaciones, (anotaciones) => anotaciones.idEstudiante)
  anotaciones: Anotaciones[];

  @OneToMany(() => Asistencia, (asistencia) => asistencia.estudiante)
  asistencias: Asistencia[];

  @ManyToOne(() => Usuario, (usuario) => usuario.estudiantes)
  @JoinColumn([{ name: "id_usuario", referencedColumnName: "idUsuario" }])
  idUsuario: Usuario;

  @OneToMany(() => Informe, (informe) => informe.estudiante)
  informes: Informe[];

  @OneToMany(() => Matricula, (matricula) => matricula.idestudiante)
  matriculas: Matricula[];

  @OneToMany(() => Notas, (notas) => notas.estudiante)
  notas: Notas[];
}
