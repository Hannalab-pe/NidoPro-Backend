import { Column, Entity, Index, OneToMany } from "typeorm";
import { Trabajador } from "./trabajador.entity";

@Index("rol_pkey", ["idrol"], { unique: true })
@Entity("rol", { schema: "public" })
export class Rol {
  @Column("uuid", {
    primary: true,
    name: "idrol",
    default: () => "uuid_generate_v4()",
  })
  idrol: string;

  @Column("character varying", { name: "nombre", length: 100 })
  nombre: string;

  @Column("text", { name: "descripcion", nullable: true })
  descripcion: string | null;

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
    name: "isactive",
    nullable: true,
    default: () => "true",
  })
  isactive: boolean | null;

  @OneToMany(() => Trabajador, (trabajador) => trabajador.idrol)
  trabajadors: Trabajador[];
}
