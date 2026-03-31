import { Controller, Get, Post, Body } from '@nestjs/common';
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
}