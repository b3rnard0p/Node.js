import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovContaCorrenteService } from './mov_conta_corrente.service';
import { MovContaCorrenteController } from './mov_conta_corrente.controller';
import { MovContaCorrente } from './mov_conta_corrente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MovContaCorrente])],
  controllers: [MovContaCorrenteController],
  providers: [MovContaCorrenteService]
})
export class MovContaCorrenteModule {}