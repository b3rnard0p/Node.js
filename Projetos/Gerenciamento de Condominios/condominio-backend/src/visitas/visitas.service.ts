import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Visita } from './visita.entity';

@Injectable()
export class VisitasService {
  constructor(
    @InjectRepository(Visita)
    private visitasRepo: Repository<Visita>,
  ) {}

  findAll(): Promise<Visita[]> {
    return this.visitasRepo.find();
  }

  create(visita: Visita): Promise<Visita> {
    return this.visitasRepo.save(visita);
  }
  async update(id: number, dados: Partial<Visita>): Promise<Visita> {
    await this.visitasRepo.update(id, dados);
    return this.visitasRepo.findOneByOrFail({ ID_VISITA: id });
  }
  
  async remove(id: number): Promise<void> {
    await this.visitasRepo.delete(id);
  }
}