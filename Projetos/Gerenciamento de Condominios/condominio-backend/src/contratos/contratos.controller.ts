import { Controller, Get, Post, Body } from '@nestjs/common';
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
}