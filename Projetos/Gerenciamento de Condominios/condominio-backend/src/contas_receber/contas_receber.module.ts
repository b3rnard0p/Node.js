import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContasReceberService } from './contas_receber.service';
import { ContasReceberController } from './contas_receber.controller';
import { ContaReceber } from './conta_receber.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContaReceber])],
  controllers: [ContasReceberController],
  providers: [ContasReceberService]
})
export class ContasReceberModule {}