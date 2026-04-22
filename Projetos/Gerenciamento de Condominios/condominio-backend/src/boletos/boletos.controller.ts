import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { BoletosService } from './boletos.service';
import { Boleto } from './boleto.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
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

  @Put(':id')
update(@Param('id') id: number, @Body() dados: Partial<Boleto>): Promise<Boleto> {
  return this.boletosService.update(id, dados);
}

@Delete(':id')
remove(@Param('id') id: number): Promise<void> {
  return this.boletosService.remove(id);
}
}