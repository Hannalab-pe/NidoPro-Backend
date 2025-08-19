import { Column, Entity, Index, OneToMany } from "typeorm";
import { Contabilidad } from "./contabilidad.entity";

@Index("pension_pkey", ["idpension"], { unique: true })
@Entity("pension", { schema: "public" })
export class Pension {
  @Column("uuid", {
    primary: true,
    name: "idpension",
    default: () => "uuid_generate_v4()",
  })
  idpension: string;

  @Column("numeric", {
    name: "monto_pension",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  montoPension: string | null;

  @Column("date", { name: "fecha_emision", nullable: true })
  fechaEmision: string | null;

  @Column("date", { name: "fecha_pago", nullable: true })
  fechaPago: string | null;

  @OneToMany(() => Contabilidad, (contabilidad) => contabilidad.idPension)
  contabilidads: Contabilidad[];
}
