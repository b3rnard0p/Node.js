import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity('CONTAS_RECEBER')
export class ContaReceber {
  @PrimaryGeneratedColumn()
  ID_CONTA_RECEBER: number;

  @Column()
  ID_MORADOR: number;

  @Column({ type: 'text', nullable: true })
  DESCRICAO: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  VALOR: number;

  @Column({ type: 'date', nullable: true })
  DATA_VENCIMENTO: Date;

  @Column({ length: 20, nullable: true })
  STATUS: string;
}