import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Matricula } from "./matricula.entity";

@Index("pago_pkey", ["idPago"], { unique: true })
@Entity("pago", { schema: "public" })
export class Pago {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_pago" })
  idPago: number;

  @Column("character varying", {
    name: "tipo_pago",
    nullable: true,
    length: 50,
  })
  tipoPago: string | null;

  @Column("numeric", { name: "monto", nullable: true, precision: 10, scale: 2 })
  monto: string | null;

  @Column("date", { name: "fecha_emision", nullable: true })
  fechaEmision: string | null;

  @Column("date", { name: "fecha_pago", nullable: true })
  fechaPago: string | null;

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

  @ManyToOne(() => Matricula, (matricula) => matricula.pagos)
  @JoinColumn([{ name: "id_matricula", referencedColumnName: "idMatricula" }])
  idMatricula: Matricula;
}
