import { Controller, Get, Post, Body } from '@nestjs/common';
import { FornecedoresService } from './fornecedores.service';
import { Fornecedor } from './fornecedor.entity';

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
}