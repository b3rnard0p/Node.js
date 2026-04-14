import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ContratosService } from './contratos.service';
import { Contrato } from './contrato.entity';

@Controller('contratos')
export class ContratosController {
  constructor(private readonly contratosService: ContratosService) {}

  @Get()
  findAll(): Promise<Contrato[]> {
    return this.contratosService.findAll();
  }

  @Post()
  create(@Body() contrato: Contrato): Promise<Contrato> {
    return this.contratosService.create(contrato);
  }

  @Put(':id')
update(@Param('id') id: number, @Body() dados: Partial<Contrato>): Promise<Contrato> {
  return this.contratosService.update(id, dados);
}

@Delete(':id')
remove(@Param('id') id: number): Promise<void> {
  return this.contratosService.remove(id);
}
}