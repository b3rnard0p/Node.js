import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pessoa } from './pessoa.entity';
@Injectable()
export class PessoasService {
 constructor(
 @InjectRepository(Pessoa)
 private pessoasRepo: Repository<Pessoa>,
 ) {}
 findAll(): Promise<Pessoa[]> {
 return this.pessoasRepo.find();
 }
 create(pessoa: Pessoa): Promise<Pessoa> {
 return this.pessoasRepo.save(pessoa);
 }

async update(id: number, dados: Partial<Pessoa>): Promise<Pessoa> {
    await this.pessoasRepo.update(id, dados);
    return this.pessoasRepo.findOneByOrFail({ ID_PESSOA: id });
}
async remove(id: number): Promise<void> {
    await this.pessoasRepo.delete(id);
}
}