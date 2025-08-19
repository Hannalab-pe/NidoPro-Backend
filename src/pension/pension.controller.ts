import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreatePensionDto } from './dto/create-pension.dto';
import { UpdatePensionDto } from './dto/update-pension.dto';
import { PensionService } from './pension.service';

@Controller('pension')
export class PensionController {
    constructor(private readonly pensionService: PensionService) { }

    @Post()
    create(@Body() createPensionDto: CreatePensionDto) {
        return this.pensionService.create(createPensionDto);
    }

    @Get()
    findAll() {
        return this.pensionService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.pensionService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updatePensionDto: UpdatePensionDto) {
        return this.pensionService.update(id, updatePensionDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.pensionService.remove(id);
    }
}
