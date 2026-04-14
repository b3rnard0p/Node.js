import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recebimento } from './recebimento.entity';

@Injectable()
export class RecebimentosService {
  constructor(
    @InjectRepository(Recebimento)
    private recebimentosRepo: Repository<Recebimento>,
  ) {}

  findAll(): Promise<Recebimento[]> {
    return this.recebimentosRepo.find();
  }

  create(recebimento: Recebimento): Promise<Recebimento> {
    return this.recebimentosRepo.save(recebimento);
  }
  async update(id: number, dados: Partial<Recebimento>): Promise<Recebimento> {
    await this.recebimentosRepo.update(id, dados);
    return this.recebimentosRepo.findOneByOrFail({ ID_RECEBIMENTO: id });
  }
  
  async remove(id: number): Promise<void> {
    await this.recebimentosRepo.delete(id);
  }
}