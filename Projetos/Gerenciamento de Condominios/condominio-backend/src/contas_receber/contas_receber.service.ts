import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContaReceber } from './conta_receber.entity';

@Injectable()
export class ContasReceberService {
  constructor(
    @InjectRepository(ContaReceber)
    private contasReceberRepo: Repository<ContaReceber>,
  ) {}

  findAll(): Promise<ContaReceber[]> {
    return this.contasReceberRepo.find();
  }

  create(contaReceber: ContaReceber): Promise<ContaReceber> {
    return this.contasReceberRepo.save(contaReceber);
  }
}