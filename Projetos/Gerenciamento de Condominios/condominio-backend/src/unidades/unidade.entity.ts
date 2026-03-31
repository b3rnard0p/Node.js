import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('UNIDADES')
export class Unidade {
  @PrimaryGeneratedColumn()
  ID_UNIDADE: number;

  @Column({ length: 10 })
  NUM_UNIDADE: string;

  @Column({ length: 10 })
  BLOCO: string;

  @Column({ length: 20, nullable: true })
  TIPO: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  AREA_TOTAL: number;
}