import { Injectable } from '@nestjs/common';
import { CreateAnotacionDto } from './dto/create-anotacion.dto';
import { UpdateAnotacionDto } from './dto/update-anotacion.dto';

@Injectable()
export class AnotacionService {
  create(createAnotacionDto: CreateAnotacionDto) {
    return 'This action adds a new anotacion';
  }

  findAll() {
    return `This action returns all anotacion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} anotacion`;
  }

  update(id: number, updateAnotacionDto: UpdateAnotacionDto) {
    return `This action updates a #${id} anotacion`;
  }

  remove(id: number) {
    return `This action removes a #${id} anotacion`;
  }
}
