import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreasComunsService } from './areas_comuns.service';
import { AreasComunsController } from './areas_comuns.controller';
import { AreaComum } from './area_comum.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AreaComum])],
  controllers: [AreasComunsController],
  providers: [AreasComunsService]
})
export class AreasComunsModule {}