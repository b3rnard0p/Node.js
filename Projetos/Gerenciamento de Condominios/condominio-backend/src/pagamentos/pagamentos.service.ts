import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pagamento } from './pagamento.entity';

@Injectable()
export class PagamentosService {
  constructor(
    @InjectRepository(Pagamento)
    private pagamentosRepo: Repository<Pagamento>,
  ) {}

  findAll(): Promise<Pagamento[]> {
    return this.pagamentosRepo.find();
  }

  create(pagamento: Pagamento): Promise<Pagamento> {
    return this.pagamentosRepo.save(pagamento);
  }
}