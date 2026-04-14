import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reserva } from './reserva.entity';

@Injectable()
export class ReservasService {
  constructor(
    @InjectRepository(Reserva)
    private reservasRepo: Repository<Reserva>,
  ) {}

  findAll(): Promise<Reserva[]> {
    return this.reservasRepo.find();
  }

  create(reserva: Reserva): Promise<Reserva> {
    return this.reservasRepo.save(reserva);
  }

  async update(id: number, dados: Partial<Reserva>): Promise<Reserva> {
    await this.reservasRepo.update(id, dados);
    return this.reservasRepo.findOneByOrFail({ ID_RESERVA: id });
  }
  
  async remove(id: number): Promise<void> {
    await this.reservasRepo.delete(id);
  }
}