import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Usuario } from "./usuario.entity";

@Index("rol_pkey", ["idrol"], { unique: true })
@Entity("rol", { schema: "public" })
export class Rol {
  @PrimaryGeneratedColumn('uuid',{ name: "idrol" })
  idrol: string;

  @Column("character varying", { name: "nombre", length: 50 })
  nombre: string;

  @Column("text", { name: "descripcion", nullable: true })
  descripcion: string | null;

  @Column("timestamp without time zone", {
    name: "creado",
    nullable: true,
    default: () => "now()",
  })
  creado: Date | null;

  @Column("timestamp without time zone", {
    name: "actualizado",
    nullable: true,
    default: () => "now()",
  })
  actualizado: Date | null;

  @OneToMany(() => Usuario, (usuario) => usuario.idrol)
  usuarios: Usuario[];
}
