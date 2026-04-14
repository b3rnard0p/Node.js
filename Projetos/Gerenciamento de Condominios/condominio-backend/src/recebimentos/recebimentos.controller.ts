import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
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
  @Put(':id')
update(@Param('id') id: number, @Body() dados: Partial<Recebimento>): Promise<Recebimento> {
  return this.recebimentosService.update(id, dados);
}

@Delete(':id')
remove(@Param('id') id: number): Promise<void> {
  return this.recebimentosService.remove(id);
}
}