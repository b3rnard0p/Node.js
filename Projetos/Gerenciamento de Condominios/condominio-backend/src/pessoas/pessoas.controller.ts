import { Controller, Get, Post, Body } from '@nestjs/common';
import { PessoasService } from './pessoas.service';
import { Pessoa } from './pessoa.entity';
@Controller('pessoas')
export class PessoasController {
 constructor(private readonly pessoasService: PessoasService) {}
 @Get()
 findAll(): Promise<Pessoa[]> {
 return this.pessoasService.findAll();
 }
 @Post()
 create(@Body() pessoa: Pessoa): Promise<Pessoa> {
 return this.pessoasService.create(pessoa);
 }
}