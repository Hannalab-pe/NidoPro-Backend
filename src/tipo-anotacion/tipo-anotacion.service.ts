import { Injectable } from '@nestjs/common';
import { CreateTipoAnotacionDto } from './dto/create-tipo-anotacion.dto';
import { UpdateTipoAnotacionDto } from './dto/update-tipo-anotacion.dto';

@Injectable()
export class TipoAnotacionService {
  create(createTipoAnotacionDto: CreateTipoAnotacionDto) {
    return 'This action adds a new tipoAnotacion';
  }

  findAll() {
    return `This action returns all tipoAnotacion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tipoAnotacion`;
  }

  update(id: number, updateTipoAnotacionDto: UpdateTipoAnotacionDto) {
    return `This action updates a #${id} tipoAnotacion`;
  }

  remove(id: number) {
    return `This action removes a #${id} tipoAnotacion`;
  }
}
