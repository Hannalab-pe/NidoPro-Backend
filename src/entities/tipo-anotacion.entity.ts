import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Anotacion } from "./anotacion.entity";

@Index("tipo_anotacion_pkey", ["idTipoAnotacion"], { unique: true })
@Entity("tipo_anotacion", { schema: "public" })
export class TipoAnotacion {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_tipo_anotacion" })
  idTipoAnotacion: number;

  @Column("character varying", { name: "nombre", nullable: true, length: 100 })
  nombre: string | null;

  @OneToMany(() => Anotacion, (anotacion) => anotacion.idTipoAnotacion)
  anotacions: Anotacion[];
}
