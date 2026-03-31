import { Controller, Get, Post, Body } from '@nestjs/common';
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
}