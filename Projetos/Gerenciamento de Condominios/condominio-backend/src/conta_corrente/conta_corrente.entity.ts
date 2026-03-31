import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity('CONTA_CORRENTE')
export class ContaCorrente {
  @PrimaryGeneratedColumn()
  ID_CONTA_CORRENTE: number;

  @Column({ length: 50, nullable: true })
  BANCO: string;

  @Column({ length: 20, nullable: true })
  AGENCIA: string;

  @Column({ length: 20, nullable: true })
  NUM_CONTA: string;

  @Column('decimal', { precision: 12, scale: 2, nullable: true })
  SALDO_ATUAL: number;
}