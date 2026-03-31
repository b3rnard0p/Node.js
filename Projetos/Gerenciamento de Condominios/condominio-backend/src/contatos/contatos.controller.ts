import { Controller, Get, Post, Body } from '@nestjs/common';
import { ContatosService } from './contatos.service';
import { Contato } from './contato.entity';

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
}