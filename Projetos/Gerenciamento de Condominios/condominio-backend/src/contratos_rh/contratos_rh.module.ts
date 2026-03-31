import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContratosRhService } from './contratos_rh.service';
import { ContratosRhController } from './contratos_rh.controller';
import { ContratoRh } from './contrato_rh.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContratoRh])],
  controllers: [ContratosRhController],
  providers: [ContratosRhService]
})
export class ContratosRhModule {}