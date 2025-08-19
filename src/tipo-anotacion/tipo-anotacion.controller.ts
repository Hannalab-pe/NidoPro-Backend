import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TipoAnotacionService } from './tipo-anotacion.service';
import { CreateTipoAnotacionDto } from './dto/create-tipo-anotacion.dto';
import { UpdateTipoAnotacionDto } from './dto/update-tipo-anotacion.dto';

@Controller('tipo-anotacion')
export class TipoAnotacionController {
  constructor(private readonly tipoAnotacionService: TipoAnotacionService) {}

  @Post()
  create(@Body() createTipoAnotacionDto: CreateTipoAnotacionDto) {
    return this.tipoAnotacionService.create(createTipoAnotacionDto);
  }

  @Get()
  findAll() {
    return this.tipoAnotacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoAnotacionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTipoAnotacionDto: UpdateTipoAnotacionDto) {
    return this.tipoAnotacionService.update(+id, updateTipoAnotacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoAnotacionService.remove(+id);
  }
}
