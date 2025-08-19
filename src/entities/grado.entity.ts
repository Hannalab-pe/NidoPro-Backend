import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Aula } from "./aula.entity";

@Index("grado_pkey", ["idGrado"], { unique: true })
@Entity("grado", { schema: "public" })
export class Grado {
  @PrimaryGeneratedColumn('uuid', { name: "id_grado" })
  idGrado: number;

  @Column("integer", { name: "nro_grado", nullable: true })
  nroGrado: number | null;

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
}
