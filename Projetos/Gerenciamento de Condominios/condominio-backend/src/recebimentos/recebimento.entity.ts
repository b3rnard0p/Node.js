import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity('RECEBIMENTOS')
export class Recebimento {
  @PrimaryGeneratedColumn()
  ID_RECEBIMENTO: number;

  @Column()
  ID_CONTA_RECEBER: number;

  @Column({ type: 'date', nullable: true })
  DATA_RECEBIMENTO: Date;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  VALOR_RECEBIDO: number;

  @Column({ length: 30, nullable: true })
  FORMA_RECEBIMENTO: string;
}