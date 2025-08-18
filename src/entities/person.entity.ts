import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Student } from './student.entity';
import { ParentStudent } from './parent-student.entity';

@Entity('persons')
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name', type: 'varchar', length: 100 })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: 100 })
  lastName: string;

  @Column({ name: 'document_type', type: 'varchar', length: 20, default: 'DNI' })
  documentType: string;

  @Column({ name: 'document_number', type: 'varchar', length: 20, unique: true })
  documentNumber: string;

  @Column({ name: 'birth_date', type: 'date', nullable: true })
  birthDate: Date;

  @Column({ type: 'varchar', length: 10, nullable: true })
  gender: 'M' | 'F' | 'Otro';

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  email: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ name: 'emergency_contact', type: 'varchar', length: 100, nullable: true })
  emergencyContact: string;

  @Column({ name: 'emergency_phone', type: 'varchar', length: 20, nullable: true })
  emergencyPhone: string;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relaciones
  @OneToOne(() => User, user => user.person)
  user: User;

  @OneToOne(() => Student, student => student.person)
  student: Student;

  @OneToMany(() => ParentStudent, parentStudent => parentStudent.parent)
  children: ParentStudent[];
}