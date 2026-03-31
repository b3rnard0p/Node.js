import { Controller, Get, Post, Body } from '@nestjs/common';
import { ComunicadosService } from './comunicados.service';
import { Comunicado } from './comunicado.entity';

@Controller('comunicados')
export class ComunicadosController {
  constructor(private readonly comunicadosService: ComunicadosService) {}

  @Get()
  findAll(): Promise<Comunicado[]> {
    return this.comunicadosService.findAll();
  }

  @Post()
  create(@Body() comunicado: Comunicado): Promise<Comunicado> {
    return this.comunicadosService.create(comunicado);
  }
}