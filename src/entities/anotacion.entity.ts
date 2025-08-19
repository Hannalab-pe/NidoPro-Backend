import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Estudiante } from "./estudiante.entity";
import { Trabajador } from "./trabajador.entity";

@Index("anotaciones_pkey", ["idAnotacion"], { unique: true })
@Entity("anotaciones", { schema: "public" })
export class Anotaciones {
  @Column("uuid", {
    primary: true,
    name: "id_anotacion",
    default: () => "uuid_generate_v4()",
  })
  idAnotacion: string;

  @Column("text", { name: "descripcion_anotacion", nullable: true })
  descripcionAnotacion: string | null;

  @Column("timestamp without time zone", {
    name: "fecha_registro",
    nullable: true,
    default: () => "now()",
  })
  fechaRegistro: Date | null;

  @ManyToOne(() => Estudiante, (estudiante) => estudiante.anotaciones)
  @JoinColumn([{ name: "id_estudiante", referencedColumnName: "idEstudiante" }])
  idEstudiante: Estudiante;

  @ManyToOne(() => Trabajador, (trabajador) => trabajador.anotaciones)
  @JoinColumn([{ name: "id_trabajador", referencedColumnName: "idtrabajador" }])
  idTrabajador: Trabajador;
}
