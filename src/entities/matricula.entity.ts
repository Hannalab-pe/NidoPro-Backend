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
import { Estudiante } from "./estudiante.entity";
import { Padre } from "./padre.entity";
import { Pago } from "./pago.entity";

@Index("matricula_pkey", ["idMatricula"], { unique: true })
@Entity("matricula", { schema: "public" })
export class Matricula {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_matricula" })
  idMatricula: number;

  @Column("numeric", {
    name: "costo_matricula",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  costoMatricula: string | null;

  @Column("date", { name: "fecha_ingreso", nullable: true })
  fechaIngreso: string | null;

  @Column("character varying", {
    name: "forma_pago",
    nullable: true,
    length: 50,
  })
  formaPago: string | null;

  @Column("character varying", { name: "voucher", nullable: true, length: 100 })
  voucher: string | null;

  @ManyToOne(() => Aula, (aula) => aula.matriculas)
  @JoinColumn([{ name: "id_aula", referencedColumnName: "idAula" }])
  idAula: Aula;

  @ManyToOne(() => Estudiante, (estudiante) => estudiante.matriculas)
  @JoinColumn([{ name: "id_estudiante", referencedColumnName: "idEstudiante" }])
  idEstudiante: Estudiante;

  @ManyToOne(() => Padre, (padre) => padre.matriculas)
  @JoinColumn([{ name: "id_padre", referencedColumnName: "idPadre" }])
  idPadre: Padre;

  @OneToMany(() => Pago, (pago) => pago.idMatricula)
  pagos: Pago[];
}
