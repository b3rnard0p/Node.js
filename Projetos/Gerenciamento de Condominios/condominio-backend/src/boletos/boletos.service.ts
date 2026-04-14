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

  async update(id: number, dados: Partial<Boleto>): Promise<Boleto> {
    await this.boletosRepo.update(id, dados);
    return this.boletosRepo.findOneByOrFail({ ID_BOLETO: id });
  }
  
  async remove(id: number): Promise<void> {
    await this.boletosRepo.delete(id);
  }
}