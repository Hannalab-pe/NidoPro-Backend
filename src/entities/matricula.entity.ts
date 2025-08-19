import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Contabilidad } from "./contabilidad.entity";
import { Estudiante } from "./estudiante.entity";
import { Grado } from "./grado.entity";
import { Padre } from "./padre.entity";


@Index("matricula_pkey", ["idmatricula"], { unique: true })
@Entity("matricula", { schema: "public" })
export class Matricula {
  @Column("uuid", {
    primary: true,
    name: "idmatricula",
    default: () => "uuid_generate_v4()",
  })
  idmatricula: string;

  @Column("numeric", {
    name: "costomatricula",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  costomatricula: string | null;

  @Column("date", { name: "fechaingreso", nullable: true })
  fechaingreso: string | null;

  @Column("character varying", {
    name: "formapago",
    nullable: true,
    length: 50,
  })
  formapago: string | null;

  @Column("text", { name: "voucher", nullable: true })
  voucher: string | null;

  @OneToMany(() => Contabilidad, (contabilidad) => contabilidad.idMatricula)
  contabilidads: Contabilidad[];

  @ManyToOne(() => Estudiante, (estudiante) => estudiante.matriculas)
  @JoinColumn([{ name: "idestudiante", referencedColumnName: "idEstudiante" }])
  idestudiante: Estudiante;

  @ManyToOne(() => Grado, (grado) => grado.matriculas)
  @JoinColumn([{ name: "idgrado", referencedColumnName: "idgrado" }])
  idgrado: Grado;

  @ManyToOne(() => Padre, (padre) => padre.matriculas)
  @JoinColumn([{ name: "idpadre", referencedColumnName: "idApoderado" }])
  idpadre: Padre;
}
