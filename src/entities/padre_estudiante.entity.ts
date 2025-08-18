import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { Trabajador } from './trabajador.entity';
import { Estudiante } from './estudiante.entity';

@Entity('padres_estudiante')
@Unique(['parentId', 'studentId', 'relationshipType'])
export class PadresEstudiantes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'parent_id' })
  parentId: number;

  @Column({ name: 'student_id' })
  studentId: number;

  @Column({
    name: 'relationship_type',
    type: 'varchar',
    length: 20,
    default: 'padre'
  })
  relationshipType: 'padre' | 'madre' | 'tutor' | 'abuelo' | 'tio' | 'otro';

  @Column({ name: 'is_primary_contact', type: 'boolean', default: false })
  isPrimaryContact: boolean;

  @Column({ name: 'can_pickup', type: 'boolean', default: true })
  canPickup: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  // Relaciones
  @ManyToOne(() => Trabajador, person => person.children)
  @JoinColumn({ name: 'parent_id' })
  parent: Trabajador;

  @ManyToOne(() => Estudiante, student => student.parents)
  @JoinColumn({ name: 'student_id' })
  student: Estudiante;
}