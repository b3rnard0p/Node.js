import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { FuncionariosService } from './funcionarios.service';
import { Funcionario } from './funcionario.entity';

@Controller('funcionarios')
export class FuncionariosController {
  constructor(private readonly funcionariosService: FuncionariosService) {}

  @Get()
  findAll(): Promise<Funcionario[]> {
    return this.funcionariosService.findAll();
  }

  @Post()
  create(@Body() funcionario: Funcionario): Promise<Funcionario> {
    return this.funcionariosService.create(funcionario);
  }
  
  @Put(':id')
update(@Param('id') id: number, @Body() dados: Partial<Funcionario>): Promise<Funcionario> {
  return this.funcionariosService.update(id, dados);
}

@Delete(':id')
remove(@Param('id') id: number): Promise<void> {
  return this.funcionariosService.remove(id);
}
}