import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
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

  @Put(':id')
update(@Param('id') id: number, @Body() dados: Partial<Unidade>): Promise<Unidade> {
  return this.unidadesService.update(id, dados);
}

@Delete(':id')
remove(@Param('id') id: number): Promise<void> {
  return this.unidadesService.remove(id);
}
}