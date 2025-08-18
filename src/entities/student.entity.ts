import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Person } from './person.entity';
import { Grade } from './grade.entity';
import { ParentStudent } from './parent-student.entity';

@Entity('students')
export class Student {
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
  @OneToOne(() => Person, person => person.student)
  @JoinColumn({ name: 'person_id' })
  person: Person;

  @ManyToOne(() => Grade, grade => grade.students)
  @JoinColumn({ name: 'grade_id' })
  grade: Grade;

  @OneToMany(() => ParentStudent, parentStudent => parentStudent.student)
  parents: ParentStudent[];
}