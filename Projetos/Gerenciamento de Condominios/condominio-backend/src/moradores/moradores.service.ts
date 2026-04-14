import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Morador } from './morador.entity';

@Injectable()
export class MoradoresService {
  constructor(
    @InjectRepository(Morador)
    private moradoresRepo: Repository<Morador>,
  ) {}

  findAll(): Promise<Morador[]> {
    return this.moradoresRepo.find();
  }

  create(morador: Morador): Promise<Morador> {
    return this.moradoresRepo.save(morador);
  }

  async update(id: number, dados: Partial<Morador>): Promise<Morador> {
    await this.moradoresRepo.update(id, dados);
    return this.moradoresRepo.findOneByOrFail({ ID_MORADOR: id });
  }
  
  async remove(id: number): Promise<void> {
    await this.moradoresRepo.delete(id);
  }
}