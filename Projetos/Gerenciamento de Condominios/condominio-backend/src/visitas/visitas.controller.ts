import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { VisitasService } from './visitas.service';
import { Visita } from './visita.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
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
  @Put(':id')
update(@Param('id') id: number, @Body() dados: Partial<Visita>): Promise<Visita> {
  return this.visitasService.update(id, dados);
}

@Delete(':id')
remove(@Param('id') id: number): Promise<void> {
  return this.visitasService.remove(id);
}
}