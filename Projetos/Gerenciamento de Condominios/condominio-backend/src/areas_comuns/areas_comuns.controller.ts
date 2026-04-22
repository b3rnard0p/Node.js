import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { AreasComunsService } from './areas_comuns.service';
import { AreaComum } from './area_comum.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
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

  @Put(':id')
update(@Param('id') id: number, @Body() dados: Partial<AreaComum>): Promise<AreaComum> {
  return this.areasComunsService.update(id, dados);
}

@Delete(':id')
remove(@Param('id') id: number): Promise<void> {
  return this.areasComunsService.remove(id);
}
}