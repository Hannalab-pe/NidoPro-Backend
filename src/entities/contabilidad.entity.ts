import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Matricula } from "./matricula.entity";
import { Pension } from "./pension.entity";

@Index("contabilidad_pkey", ["idContabilidad"], { unique: true })
@Entity("contabilidad", { schema: "public" })
export class Contabilidad {
  @Column("uuid", {
    primary: true,
    name: "id_contabilidad",
    default: () => "uuid_generate_v4()",
  })
  idContabilidad: string;

  @Column("numeric", {
    name: "ingreso",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  ingreso: string | null;

  @Column("numeric", {
    name: "egreso",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  egreso: string | null;

  @Column("date", { name: "fecha_ingreso", nullable: true })
  fechaIngreso: string | null;

  @Column("date", { name: "fecha_egreso", nullable: true })
  fechaEgreso: string | null;

  @ManyToOne(() => Matricula, (matricula) => matricula.contabilidads)
  @JoinColumn([{ name: "id_matricula", referencedColumnName: "idmatricula" }])
  idMatricula: Matricula;

  @ManyToOne(() => Pension, (pension) => pension.contabilidads)
  @JoinColumn([{ name: "id_pension", referencedColumnName: "idpension" }])
  idPension: Pension;
}
