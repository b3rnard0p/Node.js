import { Controller, Get, Post, Body } from '@nestjs/common';
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
}