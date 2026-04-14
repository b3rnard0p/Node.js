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
  async update(id: number, dados: Partial<Contato>): Promise<Contato> {
    await this.contatosRepo.update(id, dados);
    return this.contatosRepo.findOneByOrFail({ ID_CONTATO: id });
  }
  
  async remove(id: number): Promise<void> {
    await this.contatosRepo.delete(id);
  }
}