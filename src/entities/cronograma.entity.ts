import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Actividades } from "./actividades.entity";
import { Trabajador } from "./trabajador.entity";

@Index("cronograma_pkey", ["idCronograma"], { unique: true })
@Entity("cronograma", { schema: "public" })
export class Cronograma {
  @Column("uuid", {
    primary: true,
    name: "id_cronograma",
    default: () => "uuid_generate_v4()",
  })
  idCronograma: string;

  @ManyToOne(() => Actividades, (actividades) => actividades.cronogramas)
  @JoinColumn([
    { name: "id_actividades", referencedColumnName: "idActividades" },
  ])
  idActividades: Actividades;

  @ManyToOne(() => Trabajador, (trabajador) => trabajador.cronogramas)
  @JoinColumn([{ name: "id_trabajador", referencedColumnName: "idtrabajador" }])
  idTrabajador: Trabajador;
}
