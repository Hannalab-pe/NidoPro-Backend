import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Estudiante } from "./estudiante.entity";
import { Trabajador } from "./trabajador.entity";

@Index("informe_pkey", ["idInforme"], { unique: true })
@Entity("informe", { schema: "public" })
export class Informe {
  @Column("uuid", {
    primary: true,
    name: "id_informe",
    default: () => "uuid_generate_v4()",
  })
  idInforme: string;

  @Column("text", { name: "detalle_informe", nullable: true })
  detalleInforme: string | null;

  @Column("timestamp without time zone", {
    name: "fecha_registro",
    nullable: true,
    default: () => "now()",
  })
  fechaRegistro: Date | null;

  @ManyToOne(() => Estudiante, (estudiante) => estudiante.informes)
  @JoinColumn([{ name: "estudiante_id", referencedColumnName: "idEstudiante" }])
  estudiante: Estudiante;

  @ManyToOne(() => Trabajador, (trabajador) => trabajador.informes)
  @JoinColumn([{ name: "trabajador_id", referencedColumnName: "idtrabajador" }])
  trabajador: Trabajador;
}
