import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContratoRh } from './contrato_rh.entity';

@Injectable()
export class ContratosRhService {
  constructor(
    @InjectRepository(ContratoRh)
    private contratosRhRepo: Repository<ContratoRh>,
  ) {}

  findAll(): Promise<ContratoRh[]> {
    return this.contratosRhRepo.find();
  }

  create(contratoRh: ContratoRh): Promise<ContratoRh> {
    return this.contratosRhRepo.save(contratoRh);
  }
}