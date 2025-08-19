import { Column, Entity, Index, OneToMany } from "typeorm";
import { Matricula } from "./matricula.entity";

@Index("padre_pkey", ["idApoderado"], { unique: true })
@Entity("padre", { schema: "public" })
export class Padre {
  @Column("uuid", {
    primary: true,
    name: "id_apoderado",
    default: () => "uuid_generate_v4()",
  })
  idApoderado: string;

  @Column("character varying", { name: "nombre", length: 100 })
  nombre: string;

  @Column("character varying", { name: "apellido", length: 100 })
  apellido: string;

  @Column("text", { name: "direccion", nullable: true })
  direccion: string | null;

  @Column("character varying", { name: "numero", nullable: true, length: 20 })
  numero: string | null;

  @Column("character varying", { name: "email", nullable: true, length: 100 })
  email: string | null;

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

  @OneToMany(() => Matricula, (matricula) => matricula.idpadre)
  matriculas: Matricula[];
}
