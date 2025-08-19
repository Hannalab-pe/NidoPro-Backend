import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Anotacion } from "./anotacion.entity";
import { Asistencia } from "./asistencia.entity";
import { Usuario } from "./usuario.entity";
import { Informe } from "./informe.entity";
import { Matricula } from "./matricula.entity";
import { Notas } from "./notas.entity";
import { Padre } from "./padre.entity";

@Index("estudiante_pkey", ["idEstudiante"], { unique: true })
@Index("estudiante_nro_documento_key", ["nroDocumento"], { unique: true })
@Entity("estudiante", { schema: "public" })
export class Estudiante {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_estudiante" })
  idEstudiante: number;

  @Column("character varying", { name: "nombre", nullable: true, length: 100 })
  nombre: string | null;

  @Column("character varying", {
    name: "apellido",
    nullable: true,
    length: 100,
  })
  apellido: string | null;

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
    length: 20,
  })
  tipoDocumento: string | null;

  @Column("character varying", {
    name: "nro_documento",
    nullable: true,
    unique: true,
    length: 20,
  })
  nroDocumento: string | null;

  @Column("text", { name: "observaciones", nullable: true })
  observaciones: string | null;

  @OneToMany(() => Anotacion, (anotacion) => anotacion.idEstudiante)
  anotacions: Anotacion[];

  @OneToMany(() => Asistencia, (asistencia) => asistencia.idEstudiante)
  asistencias: Asistencia[];

  @ManyToOne(() => Usuario, (usuario) => usuario.estudiantes)
  @JoinColumn([{ name: "id_usuario", referencedColumnName: "idUsuario" }])
  idUsuario: Usuario;

  @OneToMany(() => Informe, (informe) => informe.idEstudiante)
  informes: Informe[];

  @OneToMany(() => Matricula, (matricula) => matricula.idEstudiante)
  matriculas: Matricula[];

  @OneToMany(() => Notas, (notas) => notas.idEstudiante)
  notas: Notas[];

  @OneToMany(() => Padre, (padre) => padre.idEstudiante)
  padres: Padre[];
}
