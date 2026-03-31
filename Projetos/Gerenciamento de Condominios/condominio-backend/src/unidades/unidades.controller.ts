import { Controller, Get, Post, Body } from '@nestjs/common';
import { UnidadesService } from './unidades.service';
import { Unidade } from './unidade.entity';

@Controller('unidades')
export class UnidadesController {
  constructor(private readonly unidadesService: UnidadesService) {}

  @Get()
  findAll(): Promise<Unidade[]> {
    return this.unidadesService.findAll();
  }

  @Post()
  create(@Body() unidade: Unidade): Promise<Unidade> {
    return this.unidadesService.create(unidade);
  }
}