import { Controller, Get, Post, Body } from '@nestjs/common';
import { BoletosService } from './boletos.service';
import { Boleto } from './boleto.entity';

@Controller('boletos')
export class BoletosController {
  constructor(private readonly boletosService: BoletosService) {}

  @Get()
  findAll(): Promise<Boleto[]> {
    return this.boletosService.findAll();
  }

  @Post()
  create(@Body() boleto: Boleto): Promise<Boleto> {
    return this.boletosService.create(boleto);
  }
}