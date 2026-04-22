import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { FornecedoresService } from './fornecedores.service';
import { Fornecedor } from './fornecedor.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('fornecedores')
export class FornecedoresController {
  constructor(private readonly fornecedoresService: FornecedoresService) {}

  @Get()
  findAll(): Promise<Fornecedor[]> {
    return this.fornecedoresService.findAll();
  }

  @Post()
  create(@Body() fornecedor: Fornecedor): Promise<Fornecedor> {
    return this.fornecedoresService.create(fornecedor);
  }

  @Put(':id')
update(@Param('id') id: number, @Body() dados: Partial<Fornecedor>): Promise<Fornecedor> {
  return this.fornecedoresService.update(id, dados);
}

@Delete(':id')
remove(@Param('id') id: number): Promise<void> {
  return this.fornecedoresService.remove(id);
}
}