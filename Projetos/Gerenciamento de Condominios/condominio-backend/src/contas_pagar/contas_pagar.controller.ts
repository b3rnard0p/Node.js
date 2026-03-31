import { Controller, Get, Post, Body } from '@nestjs/common';
import { ContasPagarService } from './contas_pagar.service';
import { ContaPagar } from './conta_pagar.entity';

@Controller('contas_pagar')
export class ContasPagarController {
  constructor(private readonly contasPagarService: ContasPagarService) {}

  @Get()
  findAll(): Promise<ContaPagar[]> {
    return this.contasPagarService.findAll();
  }

  @Post()
  create(@Body() contaPagar: ContaPagar): Promise<ContaPagar> {
    return this.contasPagarService.create(contaPagar);
  }
}