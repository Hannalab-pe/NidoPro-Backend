import { Injectable } from '@nestjs/common';
import { CreateCronogramaDto } from './dto/create-cronograma.dto';
import { UpdateCronogramaDto } from './dto/update-cronograma.dto';

@Injectable()
export class CronogramaService {
  create(createCronogramaDto: CreateCronogramaDto) {
    return 'This action adds a new cronograma';
  }

  findAll() {
    return `This action returns all cronograma`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cronograma`;
  }

  update(id: number, updateCronogramaDto: UpdateCronogramaDto) {
    return `This action updates a #${id} cronograma`;
  }

  remove(id: number) {
    return `This action removes a #${id} cronograma`;
  }
}
