import { Controller, Get, Post, Body } from '@nestjs/common';
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
}