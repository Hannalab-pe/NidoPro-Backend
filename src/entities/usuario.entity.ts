import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Estudiante } from "./estudiante.entity";
import { Trabajador } from "./trabajador.entity";
import { Rol } from "./rol.entity";

@Index("usuario_pkey", ["idUsuario"], { unique: true })
@Index("usuario_nom_usuario_key", ["nomUsuario"], { unique: true })
@Entity("usuario", { schema: "public" })
export class Usuario {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_usuario" })
  idUsuario: number;

  @Column("character varying", {
    name: "nom_usuario",
    unique: true,
    length: 50,
  })
  nomUsuario: string;

  @Column("character varying", { name: "contrasena", length: 255 })
  contrasena: string;

  @Column("boolean", {
    name: "esta_activo",
    nullable: true,
    default: () => "true",
  })
  estaActivo: boolean | null;

  @Column("timestamp without time zone", {
    name: "creado",
    nullable: true,
    default: () => "now()",
  })
  creado: Date | null;

  @Column("timestamp without time zone", {
    name: "actualizado",
    nullable: true,
    default: () => "now()",
  })
  actualizado: Date | null;

  @OneToMany(() => Estudiante, (estudiante) => estudiante.idUsuario)
  estudiantes: Estudiante[];

  @OneToMany(() => Trabajador, (trabajador) => trabajador.idUsuario)
  trabajadors: Trabajador[];

  @ManyToOne(() => Rol, (rol) => rol.usuarios)
  @JoinColumn([{ name: "idrol", referencedColumnName: "idrol" }])
  idrol: Rol;
}
