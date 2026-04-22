import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ContratosRhService } from './contratos_rh.service';
import { ContratoRh } from './contrato_rh.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
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
  @Put(':id')
update(@Param('id') id: number, @Body() dados: Partial<ContratoRh>): Promise<ContratoRh> {
  return this.contratosRhService.update(id, dados);
}

@Delete(':id')
remove(@Param('id') id: number): Promise<void> {
  return this.contratosRhService.remove(id);
}
}