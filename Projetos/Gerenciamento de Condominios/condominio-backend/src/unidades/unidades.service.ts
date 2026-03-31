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
}