import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ReservasService } from './reservas.service';
import { Reserva } from './reserva.entity';

@Controller('reservas')
export class ReservasController {
  constructor(private readonly reservasService: ReservasService) {}

  @Get()
  findAll(): Promise<Reserva[]> {
    return this.reservasService.findAll();
  }

  @Post()
  create(@Body() reserva: Reserva): Promise<Reserva> {
    return this.reservasService.create(reserva);
  }

  @Put(':id')
update(@Param('id') id: number, @Body() dados: Partial<Reserva>): Promise<Reserva> {
  return this.reservasService.update(id, dados);
}

@Delete(':id')
remove(@Param('id') id: number): Promise<void> {
  return this.reservasService.remove(id);
}
}