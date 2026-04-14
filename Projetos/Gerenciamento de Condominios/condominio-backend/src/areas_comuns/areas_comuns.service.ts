import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AreaComum } from './area_comum.entity';

@Injectable()
export class AreasComunsService {
  constructor(
    @InjectRepository(AreaComum)
    private areasComunsRepo: Repository<AreaComum>,
  ) {}

  findAll(): Promise<AreaComum[]> {
    return this.areasComunsRepo.find();
  }

  create(areaComum: AreaComum): Promise<AreaComum> {
    return this.areasComunsRepo.save(areaComum);
  }

  async update(id: number, dados: Partial<AreaComum>): Promise<AreaComum> {
    await this.areasComunsRepo.update(id, dados);
    return this.areasComunsRepo.findOneByOrFail({ ID_AREA_COMUM: id });
  }
  
  async remove(id: number): Promise<void> {
    await this.areasComunsRepo.delete(id);
  }
}