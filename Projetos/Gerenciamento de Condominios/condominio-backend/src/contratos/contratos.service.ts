import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contrato } from './contrato.entity';

@Injectable()
export class ContratosService {
  constructor(
    @InjectRepository(Contrato)
    private contratosRepo: Repository<Contrato>,
  ) {}

  findAll(): Promise<Contrato[]> {
    return this.contratosRepo.find();
  }

  create(contrato: Contrato): Promise<Contrato> {
    return this.contratosRepo.save(contrato);
  }

  async update(id: number, dados: Partial<Contrato>): Promise<Contrato> {
    await this.contratosRepo.update(id, dados);
    return this.contratosRepo.findOneByOrFail({ ID_CONTRATO: id });
  }
  
  async remove(id: number): Promise<void> {
    await this.contratosRepo.delete(id);
  }
}