import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovContaCorrente } from './mov_conta_corrente.entity';

@Injectable()
export class MovContaCorrenteService {
  constructor(
    @InjectRepository(MovContaCorrente)
    private movContaCorrenteRepo: Repository<MovContaCorrente>,
  ) {}

  findAll(): Promise<MovContaCorrente[]> {
    return this.movContaCorrenteRepo.find();
  }

  create(movContaCorrente: MovContaCorrente): Promise<MovContaCorrente> {
    return this.movContaCorrenteRepo.save(movContaCorrente);
  }
  async update(id: number, dados: Partial<MovContaCorrente>): Promise<MovContaCorrente> {
    await this.movContaCorrenteRepo.update(id, dados);
    return this.movContaCorrenteRepo.findOneByOrFail({ ID_MOVIMENTO: id });
  }
  
  async remove(id: number): Promise<void> {
    await this.movContaCorrenteRepo.delete(id);
  }
}