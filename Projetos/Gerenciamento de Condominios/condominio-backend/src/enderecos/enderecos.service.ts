import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Endereco } from './endereco.entity';

@Injectable()
export class EnderecosService {
  constructor(
    @InjectRepository(Endereco)
    private enderecosRepo: Repository<Endereco>,
  ) {}

  findAll(): Promise<Endereco[]> {
    return this.enderecosRepo.find();
  }

  create(endereco: Endereco): Promise<Endereco> {
    return this.enderecosRepo.save(endereco);
  }
}