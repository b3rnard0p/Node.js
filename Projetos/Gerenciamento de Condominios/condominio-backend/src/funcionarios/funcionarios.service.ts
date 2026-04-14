import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Funcionario } from './funcionario.entity';

@Injectable()
export class FuncionariosService {
  constructor(
    @InjectRepository(Funcionario)
    private funcionariosRepo: Repository<Funcionario>,
  ) {}

  findAll(): Promise<Funcionario[]> {
    return this.funcionariosRepo.find();
  }

  create(funcionario: Funcionario): Promise<Funcionario> {
    return this.funcionariosRepo.save(funcionario);
  }

  async update(id: number, dados: Partial<Funcionario>): Promise<Funcionario> {
    await this.funcionariosRepo.update(id, dados);
    return this.funcionariosRepo.findOneByOrFail({ ID_FUNCIONARIO: id });
  }
  
  async remove(id: number): Promise<void> {
    await this.funcionariosRepo.delete(id);
  }
}