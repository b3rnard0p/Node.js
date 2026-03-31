import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Boleto } from './boleto.entity';

@Injectable()
export class BoletosService {
  constructor(
    @InjectRepository(Boleto)
    private boletosRepo: Repository<Boleto>,
  ) {}

  findAll(): Promise<Boleto[]> {
    return this.boletosRepo.find();
  }

  create(boleto: Boleto): Promise<Boleto> {
    return this.boletosRepo.save(boleto);
  }
}