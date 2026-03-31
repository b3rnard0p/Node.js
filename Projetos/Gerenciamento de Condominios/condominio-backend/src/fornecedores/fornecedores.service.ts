import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fornecedor } from './fornecedor.entity';

@Injectable()
export class FornecedoresService {
  constructor(
    @InjectRepository(Fornecedor)
    private fornecedoresRepo: Repository<Fornecedor>,
  ) {}

  findAll(): Promise<Fornecedor[]> {
    return this.fornecedoresRepo.find();
  }

  create(fornecedor: Fornecedor): Promise<Fornecedor> {
    return this.fornecedoresRepo.save(fornecedor);
  }
}