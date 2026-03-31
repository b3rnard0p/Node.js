import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('CONTRATOS')
export class Contrato {
  @PrimaryGeneratedColumn()
  ID_CONTRATO: number;

  @Column()
  ID_FORNECEDOR: number;

  @Column({ type: 'text', nullable: true })
  DESCRICAO: string;

  @Column({ type: 'date', nullable: true })
  DATA_INICIO: Date;

  @Column({ type: 'date', nullable: true })
  DATA_FIM: Date;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  VALOR: number;
}