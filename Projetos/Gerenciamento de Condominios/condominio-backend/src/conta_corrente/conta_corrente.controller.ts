import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ContaCorrenteService } from './conta_corrente.service';
import { ContaCorrente } from './conta_corrente.entity';

@Controller('conta_corrente')
export class ContaCorrenteController {
  constructor(private readonly contaCorrenteService: ContaCorrenteService) {}

  @Get()
  findAll(): Promise<ContaCorrente[]> {
    return this.contaCorrenteService.findAll();
  }

  @Post()
  create(@Body() contaCorrente: ContaCorrente): Promise<ContaCorrente> {
    return this.contaCorrenteService.create(contaCorrente);
  }

  @Put(':id')
update(@Param('id') id: number, @Body() dados: Partial<ContaCorrente>): Promise<ContaCorrente> {
  return this.contaCorrenteService.update(id, dados);
}

@Delete(':id')
remove(@Param('id') id: number): Promise<void> {
  return this.contaCorrenteService.remove(id);
}
}