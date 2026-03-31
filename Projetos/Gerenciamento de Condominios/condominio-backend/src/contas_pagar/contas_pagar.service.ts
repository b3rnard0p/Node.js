import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContaPagar } from './conta_pagar.entity';

@Injectable()
export class ContasPagarService {
  constructor(
    @InjectRepository(ContaPagar)
    private contasPagarRepo: Repository<ContaPagar>,
  ) {}

  findAll(): Promise<ContaPagar[]> {
    return this.contasPagarRepo.find();
  }

  create(contaPagar: ContaPagar): Promise<ContaPagar> {
    return this.contasPagarRepo.save(contaPagar);
  }
}