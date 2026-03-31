import { Controller, Get, Post, Body } from '@nestjs/common';
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
}