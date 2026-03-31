import { Controller, Get, Post, Body } from '@nestjs/common';
import { PagamentosService } from './pagamentos.service';
import { Pagamento } from './pagamento.entity';

@Controller('pagamentos')
export class PagamentosController {
  constructor(private readonly pagamentosService: PagamentosService) {}

  @Get()
  findAll(): Promise<Pagamento[]> {
    return this.pagamentosService.findAll();
  }

  @Post()
  create(@Body() pagamento: Pagamento): Promise<Pagamento> {
    return this.pagamentosService.create(pagamento);
  }
}