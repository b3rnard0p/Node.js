import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnidadesService } from './unidades.service';
import { UnidadesController } from './unidades.controller';
import { Unidade } from './unidade.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Unidade])],
  controllers: [UnidadesController],
  providers: [UnidadesService]
})
export class UnidadesModule {}