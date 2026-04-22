import { PessoasService } from './pessoas.service';
import { Pessoa } from './pessoa.entity';
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
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
 @Put(':id')
 update(@Param('id') id: number, @Body() dados: Partial<Pessoa>):
Promise<Pessoa> {
 return this.pessoasService.update(id, dados);
 }
 @Delete(':id')
 remove(@Param('id') id: number): Promise<void> {
 return this.pessoasService.remove(id);
 }
}
