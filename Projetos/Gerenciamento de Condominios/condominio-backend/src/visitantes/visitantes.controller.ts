import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { VisitantesService } from './visitantes.service';
import { Visitante } from './visitante.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('visitantes')
export class VisitantesController {
  constructor(private readonly visitantesService: VisitantesService) {}

  @Get()
  findAll(): Promise<Visitante[]> {
    return this.visitantesService.findAll();
  }

  @Post()
  create(@Body() visitante: Visitante): Promise<Visitante> {
    return this.visitantesService.create(visitante);
  }

  @Put(':id')
update(@Param('id') id: number, @Body() dados: Partial<Visitante>): Promise<Visitante> {
  return this.visitantesService.update(id, dados);
}

@Delete(':id')
remove(@Param('id') id: number): Promise<void> {
  return this.visitantesService.remove(id);
}
}