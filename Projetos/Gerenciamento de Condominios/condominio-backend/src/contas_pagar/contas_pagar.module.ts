import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContasPagarService } from './contas_pagar.service';
import { ContasPagarController } from './contas_pagar.controller';
import { ContaPagar } from './conta_pagar.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContaPagar])],
  controllers: [ContasPagarController],
  providers: [ContasPagarService]
})
export class ContasPagarModule {}