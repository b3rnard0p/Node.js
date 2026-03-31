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
}