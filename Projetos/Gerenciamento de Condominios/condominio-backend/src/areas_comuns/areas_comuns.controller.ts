import { Controller, Get, Post, Body } from '@nestjs/common';
import { AreasComunsService } from './areas_comuns.service';
import { AreaComum } from './area_comum.entity';

@Controller('areas-comuns')
export class AreasComunsController {
  constructor(private readonly areasComunsService: AreasComunsService) {}

  @Get()
  findAll(): Promise<AreaComum[]> {
    return this.areasComunsService.findAll();
  }

  @Post()
  create(@Body() areaComum: AreaComum): Promise<AreaComum> {
    return this.areasComunsService.create(areaComum);
  }
}