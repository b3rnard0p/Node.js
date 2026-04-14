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
  async update(id: number, dados: Partial<Endereco>): Promise<Endereco> {
    await this.enderecosRepo.update(id, dados);
    return this.enderecosRepo.findOneByOrFail({ ID_ENDERECO: id });
  }
  
  async remove(id: number): Promise<void> {
    await this.enderecosRepo.delete(id);
  }
}