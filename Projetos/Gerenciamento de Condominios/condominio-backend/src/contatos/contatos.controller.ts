import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ContatosService } from './contatos.service';
import { Contato } from './contato.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('contatos')
export class ContatosController {
  constructor(private readonly contatosService: ContatosService) {}

  @Get()
  findAll(): Promise<Contato[]> {
    return this.contatosService.findAll();
  }

  @Post()
  create(@Body() contato: Contato): Promise<Contato> {
    return this.contatosService.create(contato);
  }
  @Put(':id')
update(@Param('id') id: number, @Body() dados: Partial<Contato>): Promise<Contato> {
  return this.contatosService.update(id, dados);
}

@Delete(':id')
remove(@Param('id') id: number): Promise<void> {
  return this.contatosService.remove(id);
}
}