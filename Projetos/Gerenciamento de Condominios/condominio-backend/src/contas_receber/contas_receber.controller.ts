import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ContasReceberService } from './contas_receber.service';
import { ContaReceber } from './conta_receber.entity';

@Controller('contas_receber')
export class ContasReceberController {
  constructor(private readonly contasReceberService: ContasReceberService) {}

  @Get()
  findAll(): Promise<ContaReceber[]> {
    return this.contasReceberService.findAll();
  }

  @Post()
  create(@Body() contaReceber: ContaReceber): Promise<ContaReceber> {
    return this.contasReceberService.create(contaReceber);
  }

  @Put(':id')
update(@Param('id') id: number, @Body() dados: Partial<ContaReceber>): Promise<ContaReceber> {
  return this.contasReceberService.update(id, dados);
}

@Delete(':id')
remove(@Param('id') id: number): Promise<void> {
  return this.contasReceberService.remove(id);
}
}