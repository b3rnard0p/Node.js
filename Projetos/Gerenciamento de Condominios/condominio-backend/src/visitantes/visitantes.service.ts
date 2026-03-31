import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Visitante } from './visitante.entity';

@Injectable()
export class VisitantesService {
  constructor(
    @InjectRepository(Visitante)
    private visitantesRepo: Repository<Visitante>,
  ) {}

  findAll(): Promise<Visitante[]> {
    return this.visitantesRepo.find();
  }

  create(visitante: Visitante): Promise<Visitante> {
    return this.visitantesRepo.save(visitante);
  }
}