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

  async update(id: number, dados: Partial<Fornecedor>): Promise<Fornecedor> {
    await this.fornecedoresRepo.update(id, dados);
    return this.fornecedoresRepo.findOneByOrFail({ ID_FORNECEDOR: id });
  }
  
  async remove(id: number): Promise<void> {
    await this.fornecedoresRepo.delete(id);
  }
}