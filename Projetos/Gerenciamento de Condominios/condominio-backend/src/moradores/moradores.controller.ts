import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { MoradoresService } from './moradores.service';
import { Morador } from './morador.entity';

@Controller('moradores')
export class MoradoresController {
  constructor(private readonly moradoresService: MoradoresService) {}

  @Get()
  findAll(): Promise<Morador[]> {
    return this.moradoresService.findAll();
  }

  @Post()
  create(@Body() morador: Morador): Promise<Morador> {
    return this.moradoresService.create(morador);
  }

  @Put(':id')
update(@Param('id') id: number, @Body() dados: Partial<Morador>): Promise<Morador> {
  return this.moradoresService.update(id, dados);
}

@Delete(':id')
remove(@Param('id') id: number): Promise<void> {
  return this.moradoresService.remove(id);
}
}