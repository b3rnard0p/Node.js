import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('AREAS_COMUNS')
export class AreaComum {
  @PrimaryGeneratedColumn()
  ID_AREA_COMUM: number;

  @Column({ length: 50 })
  NOME_AREA: string;

  @Column({ type: 'text', nullable: true })
  DESCR_AREA: string;

  @Column({ nullable: true })
  CAPACIDADE: number;
}