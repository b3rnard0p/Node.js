import { Controller, Get, Post, Body } from '@nestjs/common';
import { VisitantesService } from './visitantes.service';
import { Visitante } from './visitante.entity';

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
}