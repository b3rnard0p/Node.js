import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContaCorrenteService } from './conta_corrente.service';
import { ContaCorrenteController } from './conta_corrente.controller';
import { ContaCorrente } from './conta_corrente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContaCorrente])],
  controllers: [ContaCorrenteController],
  providers: [ContaCorrenteService]
})
export class ContaCorrenteModule {}