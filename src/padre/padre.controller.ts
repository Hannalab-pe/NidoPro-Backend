import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PadreService } from './padre.service';
import { CreatePadreDto } from './dto/create-padre.dto';
import { UpdatePadreDto } from './dto/update-padre.dto';

@Controller('padre')
export class PadreController {
  constructor(private readonly padreService: PadreService) { }

  @Post()
  create(@Body() createPadreDto: CreatePadreDto) {
    return this.padreService.create(createPadreDto);
  }

  @Get()
  findAll() {
    return this.padreService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.padreService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePadreDto: UpdatePadreDto) {
    return this.padreService.update(id, updatePadreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.padreService.remove(id);
  }
}
