import { Controller, Get, Post, Body } from '@nestjs/common';
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
}