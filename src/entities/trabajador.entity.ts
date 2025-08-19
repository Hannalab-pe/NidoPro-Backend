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
import { Aula } from "./aula.entity";
import { Cronograma } from "./cronograma.entity";
import { Curso } from "./curso.entity";
import { Informe } from "./informe.entity";
import { Usuario } from "./usuario.entity";

@Index("trabajador_pkey", ["idTrabajador"], { unique: true })
@Index("trabajador_nro_documento_key", ["nroDocumento"], { unique: true })
@Entity("trabajador", { schema: "public" })
export class Trabajador {
  @PrimaryGeneratedColumn('uuid',{ name: "id_trabajador" })
  idTrabajador: string;

  @Column("character varying", { name: "nombre", nullable: true, length: 100 })
  nombre: string | null;

  @Column("character varying", {
    name: "apellido",
    nullable: true,
    length: 100,
  })
  apellido: string | null;

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

  @Column("text", { name: "direccion", nullable: true })
  direccion: string | null;

  @Column("character varying", { name: "email", nullable: true, length: 100 })
  email: string | null;

  @Column("character varying", { name: "telefono", nullable: true, length: 20 })
  telefono: string | null;

  @Column("boolean", {
    name: "is_active",
    nullable: true,
    default: () => "true",
  })
  isActive: boolean | null;

  @OneToMany(() => Anotacion, (anotacion) => anotacion.idTrabajador)
  anotacions: Anotacion[];

  @OneToMany(() => Aula, (aula) => aula.idTrabajador)
  aulas: Aula[];

  @OneToMany(() => Cronograma, (cronograma) => cronograma.idTrabajador)
  cronogramas: Cronograma[];

  @OneToMany(() => Curso, (curso) => curso.idTrabajador)
  cursos: Curso[];

  @OneToMany(() => Informe, (informe) => informe.idTrabajador)
  informes: Informe[];

  @ManyToOne(() => Usuario, (usuario) => usuario.trabajadors)
  @JoinColumn([{ name: "id_usuario", referencedColumnName: "idUsuario" }])
  idUsuario: Usuario;
}
