import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoAnotacionDto } from './create-tipo-anotacion.dto';

export class UpdateTipoAnotacionDto extends PartialType(CreateTipoAnotacionDto) {}
