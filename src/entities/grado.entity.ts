import { Column, Entity, Index, OneToMany } from "typeorm";
import { Aula } from "./aula.entity";
import { Matricula } from "./matricula.entity";

@Index("grado_pkey", ["idgrado"], { unique: true })
@Entity("grado", { schema: "public" })
export class Grado {
  @Column("uuid", {
    primary: true,
    name: "idgrado",
    default: () => "uuid_generate_v4()",
  })
  idgrado: string;

  @Column("character varying", { name: "nrogrado", nullable: true, length: 50 })
  nrogrado: string | null;

  @Column("text", { name: "descripcion", nullable: true })
  descripcion: string | null;

  @Column("character varying", { name: "seccion", nullable: true, length: 10 })
  seccion: string | null;

  @Column("integer", { name: "capacidad", nullable: true })
  capacidad: number | null;

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

  @OneToMany(() => Aula, (aula) => aula.idGrado)
  aulas: Aula[];

  @OneToMany(() => Matricula, (matricula) => matricula.idgrado)
  matriculas: Matricula[];
}
