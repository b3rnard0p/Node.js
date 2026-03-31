import { Controller, Get, Post, Body } from '@nestjs/common';
import { RecebimentosService } from './recebimentos.service';
import { Recebimento } from './recebimento.entity';

@Controller('recebimentos')
export class RecebimentosController {
  constructor(private readonly recebimentosService: RecebimentosService) {}

  @Get()
  findAll(): Promise<Recebimento[]> {
    return this.recebimentosService.findAll();
  }

  @Post()
  create(@Body() recebimento: Recebimento): Promise<Recebimento> {
    return this.recebimentosService.create(recebimento);
  }
}