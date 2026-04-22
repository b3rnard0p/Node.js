import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ComunicadosService } from './comunicados.service';
import { Comunicado } from './comunicado.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
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

  @Put(':id')
update(@Param('id') id: number, @Body() dados: Partial<Comunicado>): Promise<Comunicado> {
  return this.comunicadosService.update(id, dados);
}

@Delete(':id')
remove(@Param('id') id: number): Promise<void> {
  return this.comunicadosService.remove(id);
}
}