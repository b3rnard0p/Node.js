import { Controller, Get, Post, Body } from '@nestjs/common';
import { ContratosRhService } from './contratos_rh.service';
import { ContratoRh } from './contrato_rh.entity';

@Controller('contratos_rh')
export class ContratosRhController {
  constructor(private readonly contratosRhService: ContratosRhService) {}

  @Get()
  findAll(): Promise<ContratoRh[]> {
    return this.contratosRhService.findAll();
  }

  @Post()
  create(@Body() contratoRh: ContratoRh): Promise<ContratoRh> {
    return this.contratosRhService.create(contratoRh);
  }
}