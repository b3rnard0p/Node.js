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
}