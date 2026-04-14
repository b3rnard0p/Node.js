import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comunicado } from './comunicado.entity';

@Injectable()
export class ComunicadosService {
  constructor(
    @InjectRepository(Comunicado)
    private comunicadosRepo: Repository<Comunicado>,
  ) {}

  findAll(): Promise<Comunicado[]> {
    return this.comunicadosRepo.find();
  }

  create(comunicado: Comunicado): Promise<Comunicado> {
    return this.comunicadosRepo.save(comunicado);
  }
  async update(id: number, dados: Partial<Comunicado>): Promise<Comunicado> {
    await this.comunicadosRepo.update(id, dados);
    return this.comunicadosRepo.findOneByOrFail({ ID_COMUNICADO: id });
  }
  
  async remove(id: number): Promise<void> {
    await this.comunicadosRepo.delete(id);
  }
}