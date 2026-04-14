import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Unidade } from './unidade.entity';

@Injectable()
export class UnidadesService {
  constructor(
    @InjectRepository(Unidade)
    private unidadesRepo: Repository<Unidade>,
  ) {}

  findAll(): Promise<Unidade[]> {
    return this.unidadesRepo.find();
  }

  create(unidade: Unidade): Promise<Unidade> {
    return this.unidadesRepo.save(unidade);
  }

  async update(id: number, dados: Partial<Unidade>): Promise<Unidade> {
    await this.unidadesRepo.update(id, dados);
    return this.unidadesRepo.findOneByOrFail({ ID_UNIDADE: id });
  }
  
  async remove(id: number): Promise<void> {
    await this.unidadesRepo.delete(id);
  }
}