import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Matricula } from "./matricula.entity";
import { Estudiante } from "./estudiante.entity";

@Index("padre_pkey", ["idPadre"], { unique: true })
@Entity("padre", { schema: "public" })
export class Padre {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_padre" })
  idPadre: number;

  @Column("character varying", { name: "nombre", nullable: true, length: 100 })
  nombre: string | null;

  @Column("character varying", {
    name: "apellido",
    nullable: true,
    length: 100,
  })
  apellido: string | null;

  @Column("text", { name: "direccion", nullable: true })
  direccion: string | null;

  @Column("character varying", { name: "telefono", nullable: true, length: 20 })
  telefono: string | null;

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

  @OneToMany(() => Matricula, (matricula) => matricula.idPadre)
  matriculas: Matricula[];

  @ManyToOne(() => Estudiante, (estudiante) => estudiante.padres)
  @JoinColumn([{ name: "id_estudiante", referencedColumnName: "idEstudiante" }])
  idEstudiante: Estudiante;
}
