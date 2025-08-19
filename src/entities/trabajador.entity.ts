import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Anotaciones } from "./anotacion.entity";
import { Aula } from "./aula.entity";
import { Cronograma } from "./cronograma.entity";
import { Curso } from "./curso.entity";
import { Informe } from "./informe.entity";
import { Usuario } from "./usuario.entity";
import { Rol } from "./rol.entity";
@Index("trabajador_pkey", ["idtrabajador"], { unique: true })
@Index("trabajador_nro_documento_key", ["nroDocumento"], { unique: true })
@Entity("trabajador", { schema: "public" })
export class Trabajador {
  @Column("uuid", {
    primary: true,
    name: "idtrabajador",
    default: () => "uuid_generate_v4()",
  })
  idtrabajador: string;

  @Column("character varying", { name: "nombre", length: 100 })
  nombre: string;

  @Column("character varying", { name: "apellido", length: 100 })
  apellido: string;

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

  @Column("text", { name: "direccion", nullable: true })
  direccion: string | null;

  @Column("character varying", { name: "email", nullable: true, length: 100 })
  email: string | null;

  @Column("character varying", { name: "telefono", nullable: true, length: 20 })
  telefono: string | null;

  @Column("boolean", {
    name: "isactive",
    nullable: true,
    default: () => "true",
  })
  isactive: boolean | null;

  @OneToMany(() => Anotaciones, (anotaciones) => anotaciones.idTrabajador)
  anotaciones: Anotaciones[];

  @OneToMany(() => Aula, (aula) => aula.idTrabajador)
  aulas: Aula[];

  @OneToMany(() => Cronograma, (cronograma) => cronograma.idTrabajador)
  cronogramas: Cronograma[];

  @OneToMany(() => Curso, (curso) => curso.idTrabajador)
  cursos: Curso[];

  @OneToMany(() => Informe, (informe) => informe.trabajador)
  informes: Informe[];

  @ManyToOne(() => Usuario, (usuario) => usuario.trabajadors)
  @JoinColumn([{ name: "id_usuario", referencedColumnName: "idUsuario" }])
  idUsuario: Usuario;

  @ManyToOne(() => Rol, (rol) => rol.trabajadors)
  @JoinColumn([{ name: "idrol", referencedColumnName: "idrol" }])
  idrol: Rol;
}
