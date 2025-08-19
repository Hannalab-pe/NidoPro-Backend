import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Aula } from "./aula.entity";
import { Estudiante } from "./estudiante.entity";
import { Cronograma } from "./cronograma.entity";

@Index("actividades_pkey", ["idActividades"], { unique: true })
@Entity("actividades", { schema: "public" })
export class Actividades {
  @Column("uuid", {
    primary: true,
    name: "id_actividades",
    default: () => "uuid_generate_v4()",
  })
  idActividades: string;

  @Column("character varying", {
    name: "nombre_actividad",
    nullable: true,
    length: 100,
  })
  nombreActividad: string | null;

  @Column("text", { name: "descripcion", nullable: true })
  descripcion: string | null;

  @Column("date", { name: "fecha_actividad", nullable: true })
  fechaActividad: string | null;

  @ManyToOne(() => Aula, (aula) => aula.actividades)
  @JoinColumn([{ name: "aula_id", referencedColumnName: "idAula" }])
  aula: Aula;

  @ManyToOne(() => Estudiante, (estudiante) => estudiante.actividades)
  @JoinColumn([{ name: "estudiante_id", referencedColumnName: "idEstudiante" }])
  estudiante: Estudiante;

  @OneToMany(() => Cronograma, (cronograma) => cronograma.idActividades)
  cronogramas: Cronograma[];
}
