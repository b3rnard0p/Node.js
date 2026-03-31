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
}