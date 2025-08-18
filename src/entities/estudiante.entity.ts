import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Trabajador } from './trabajador.entity';
import { Grado } from './grado.entity';
import { PadresEstudiantes } from './padre_Estudiante.entity';

@Entity('estudiante')
export class Estudiante {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'person_id' })
  personId: number;

  @Column({ name: 'grade_id' })
  gradeId: number;

  @Column({ name: 'student_code', type: 'varchar', length: 20, unique: true, nullable: true })
  studentCode: string;

  @Column({ name: 'enrollment_date', type: 'date', default: () => 'CURRENT_DATE' })
  enrollmentDate: Date;

  @Column({
    type: 'varchar',
    length: 20,
    default: 'active'
  })
  status: 'active' | 'inactive' | 'transferred' | 'graduated';

  @Column({ name: 'academic_year', type: 'integer', default: () => 'EXTRACT(YEAR FROM CURRENT_DATE)' })
  academicYear: number;

  @Column({ type: 'text', nullable: true })
  observations: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relaciones
  @OneToOne(() => Trabajador, person => person.student)
  @JoinColumn({ name: 'person_id' })
  person: Trabajador;

  @ManyToOne(() => Grado, grade => grade.students)
  @JoinColumn({ name: 'grade_id' })
  grade: Grado;

  @OneToMany(() => PadresEstudiantes, parentStudent => parentStudent.student)
  parents: PadresEstudiantes[];
}