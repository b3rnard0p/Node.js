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
}