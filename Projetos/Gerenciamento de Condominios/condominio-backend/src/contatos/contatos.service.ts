import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contato } from './contato.entity';

@Injectable()
export class ContatosService {
  constructor(
    @InjectRepository(Contato)
    private contatosRepo: Repository<Contato>,
  ) {}

  findAll(): Promise<Contato[]> {
    return this.contatosRepo.find();
  }

  create(contato: Contato): Promise<Contato> {
    return this.contatosRepo.save(contato);
  }
}