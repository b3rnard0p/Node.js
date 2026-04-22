import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { EnderecosService } from './enderecos.service';
import { Endereco } from './endereco.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('enderecos')
export class EnderecosController {
  constructor(private readonly enderecosService: EnderecosService) {}

  @Get()
  findAll(): Promise<Endereco[]> {
    return this.enderecosService.findAll();
  }

  @Post()
  create(@Body() endereco: Endereco): Promise<Endereco> {
    return this.enderecosService.create(endereco);
  }
  @Put(':id')
update(@Param('id') id: number, @Body() dados: Partial<Endereco>): Promise<Endereco> {
  return this.enderecosService.update(id, dados);
}

@Delete(':id')
remove(@Param('id') id: number): Promise<void> {
  return this.enderecosService.remove(id);
}
}