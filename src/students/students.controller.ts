import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  UseGuards,
  Query 
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('students')
@UseGuards(AuthGuard('jwt'))
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  async create(@Body() createStudentDto: CreateStudentDto) {
    const studentId = await this.studentsService.create(createStudentDto);
    return this.studentsService.findOne(studentId);
  }

  @Get()
  findAll(
    @Query('gradeId') gradeId?: string,
    @Query('status') status?: string,
    @Query('search') search?: string
  ) {
    if (search) {
      return this.studentsService.searchStudents(search);
    }
    
    const gradeIdNumber = gradeId ? +gradeId : undefined;
    return this.studentsService.findAll(gradeIdNumber, status);
  }

  @Get('by-grade/:gradeId')
  findByGrade(@Param('gradeId') gradeId: string) {
    return this.studentsService.findByGrade(+gradeId);
  }

  @Get('by-parent/:documentNumber')
  findByParent(@Param('documentNumber') documentNumber: string) {
    return this.studentsService.findByParent(documentNumber);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(+id, updateStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsService.remove(+id);
  }
}