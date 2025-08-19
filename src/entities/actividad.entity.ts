import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Aula } from "./aula.entity";
import { Cronograma } from "./cronograma.entity";

@Index("actividad_pkey", ["idActividad"], { unique: true })
@Entity("actividad", { schema: "public" })
export class Actividad {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_actividad" })
  idActividad: number;

  @Column("character varying", { name: "nombre", nullable: true, length: 100 })
  nombre: string | null;

  @Column("text", { name: "descripcion", nullable: true })
  descripcion: string | null;

  @Column("date", { name: "fecha", nullable: true })
  fecha: string | null;

  @ManyToOne(() => Aula, (aula) => aula.actividads)
  @JoinColumn([{ name: "id_aula", referencedColumnName: "idAula" }])
  idAula: Aula;

  @OneToMany(() => Cronograma, (cronograma) => cronograma.idActividad)
  cronogramas: Cronograma[];
}
