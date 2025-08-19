import { Column, Entity, Index, OneToMany } from "typeorm";
import { Estudiante } from "./estudiante.entity";
import { Trabajador } from "./trabajador.entity";

@Index("usuario_pkey", ["idUsuario"], { unique: true })
@Index("usuario_nom_usuario_key", ["nomUsuario"], { unique: true })
@Entity("usuario", { schema: "public" })
export class Usuario {
  @Column("uuid", {
    primary: true,
    name: "id_usuario",
    default: () => "uuid_generate_v4()",
  })
  idUsuario: string;

  @Column("character varying", {
    name: "nom_usuario",
    unique: true,
    length: 100,
  })
  nomUsuario: string;

  @Column("text", { name: "contrasena" })
  contrasena: string;

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

  @Column("boolean", {
    name: "esta_activo",
    nullable: true,
    default: () => "true",
  })
  estaActivo: boolean | null;

  @OneToMany(() => Estudiante, (estudiante) => estudiante.idUsuario)
  estudiantes: Estudiante[];

  @OneToMany(() => Trabajador, (trabajador) => trabajador.idUsuario)
  trabajadors: Trabajador[];
}
