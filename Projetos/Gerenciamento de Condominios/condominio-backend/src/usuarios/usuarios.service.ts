import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepo: Repository<Usuario>,
  ) {}

  findAll(): Promise<Usuario[]> {
    return this.usuariosRepo.find();
  }

  async create(dados: Partial<Usuario>): Promise<Usuario> {
    if (dados.password) {
      const salt = await bcrypt.genSalt(10);
      dados.password = await bcrypt.hash(dados.password, salt);
    }
    
    const usuario = this.usuariosRepo.create(dados);
    return this.usuariosRepo.save(usuario);
  }

  async update(id: number, dados: Partial<Usuario>): Promise<Usuario> {
    if (dados.password) {
      const salt = await bcrypt.genSalt(10);
      dados.password = await bcrypt.hash(dados.password, salt);
    }
    
    await this.usuariosRepo.update(id, dados);
    return this.usuariosRepo.findOneByOrFail({ ID_USUARIO: id });
  }

  async remove(id: number): Promise<void> {
    await this.usuariosRepo.delete(id);
  }
}