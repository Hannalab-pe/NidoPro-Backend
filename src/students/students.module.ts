import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { Student, Person, Grade, ParentStudent } from '../entities';

@Module({
  imports: [TypeOrmModule.forFeature([Student, Person, Grade, ParentStudent])],
  controllers: [StudentsController],
  providers: [StudentsService],
  exports: [StudentsService],
})
export class StudentsModule {}