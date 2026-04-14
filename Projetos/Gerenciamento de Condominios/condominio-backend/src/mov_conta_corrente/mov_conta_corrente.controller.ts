import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { MovContaCorrenteService } from './mov_conta_corrente.service';
import { MovContaCorrente } from './mov_conta_corrente.entity';

@Controller('mov_conta_corrente')
export class MovContaCorrenteController {
  constructor(private readonly movContaCorrenteService: MovContaCorrenteService) {}

  @Get()
  findAll(): Promise<MovContaCorrente[]> {
    return this.movContaCorrenteService.findAll();
  }

  @Post()
  create(@Body() movContaCorrente: MovContaCorrente): Promise<MovContaCorrente> {
    return this.movContaCorrenteService.create(movContaCorrente);
  }
  @Put(':id')
update(@Param('id') id: number, @Body() dados: Partial<MovContaCorrente>): Promise<MovContaCorrente> {
  return this.movContaCorrenteService.update(id, dados);
}

@Delete(':id')
remove(@Param('id') id: number): Promise<void> {
  return this.movContaCorrenteService.remove(id);
}
}