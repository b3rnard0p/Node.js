import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './usuario.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  // Rota de cadastro fica pública (sem @UseGuards)
  @Post()
  create(@Body() usuario: Partial<Usuario>): Promise<Usuario> {
    return this.usuariosService.create(usuario);
  }

  // As outras rotas continuam protegidas
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<Usuario[]> {
    return this.usuariosService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: number, @Body() dados: Partial<Usuario>): Promise<Usuario> {
    return this.usuariosService.update(id, dados);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.usuariosService.remove(id);
  }
}