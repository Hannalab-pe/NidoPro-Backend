import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Actividad } from "./actividad.entity";
import { Trabajador } from "./trabajador.entity";

@Index("cronograma_pkey", ["idCronograma"], { unique: true })
@Entity("cronograma", { schema: "public" })
export class Cronograma {
  @PrimaryGeneratedColumn('uuid', { name: "id_cronograma" })
  idCronograma: string;

  @ManyToOne(() => Actividad, (actividad) => actividad.cronogramas)
  @JoinColumn([{ name: "id_actividad", referencedColumnName: "idActividad" }])
  idActividad: Actividad;

  @ManyToOne(() => Trabajador, (trabajador) => trabajador.cronogramas)
  @JoinColumn([{ name: "id_trabajador", referencedColumnName: "idTrabajador" }])
  idTrabajador: Trabajador;
}
