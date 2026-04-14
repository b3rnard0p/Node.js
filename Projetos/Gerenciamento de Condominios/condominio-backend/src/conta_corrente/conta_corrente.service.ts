import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContaCorrente } from './conta_corrente.entity';

@Injectable()
export class ContaCorrenteService {
  constructor(
    @InjectRepository(ContaCorrente)
    private contaCorrenteRepo: Repository<ContaCorrente>,
  ) {}

  findAll(): Promise<ContaCorrente[]> {
    return this.contaCorrenteRepo.find();
  }

  create(contaCorrente: ContaCorrente): Promise<ContaCorrente> {
    return this.contaCorrenteRepo.save(contaCorrente);
  }

  async update(id: number, dados: Partial<ContaCorrente>): Promise<ContaCorrente> {
    await this.contaCorrenteRepo.update(id, dados);
    return this.contaCorrenteRepo.findOneByOrFail({ ID_CONTA_CORRENTE: id });
  }
  
  async remove(id: number): Promise<void> {
    await this.contaCorrenteRepo.delete(id);
  }
}