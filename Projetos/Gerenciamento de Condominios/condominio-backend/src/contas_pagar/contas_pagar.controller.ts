import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
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

  @Put(':id')
update(@Param('id') id: number, @Body() dados: Partial<ContaPagar>): Promise<ContaPagar> {
  return this.contasPagarService.update(id, dados);
}

@Delete(':id')
remove(@Param('id') id: number): Promise<void> {
  return this.contasPagarService.remove(id);
}
}