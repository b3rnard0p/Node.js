import { Controller, Get, Post, Body } from '@nestjs/common';
import { VisitasService } from './visitas.service';
import { Visita } from './visita.entity';

@Controller('visitas')
export class VisitasController {
  constructor(private readonly visitasService: VisitasService) {}

  @Get()
  findAll(): Promise<Visita[]> {
    return this.visitasService.findAll();
  }

  @Post()
  create(@Body() visita: Visita): Promise<Visita> {
    return this.visitasService.create(visita);
  }
}