import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity('MOV_CONTA_CORRENTE')
export class MovContaCorrente {
  @PrimaryGeneratedColumn()
  ID_MOVIMENTO: number;

  @Column()
  ID_CONTA_CORRENTE: number;

  @Column({ nullable: true })
  ID_CONTA: number;

  @Column({ length: 20, nullable: true })
  ORIGEM_CONTA: string;

  @Column({ length: 20, nullable: true })
  TIPO_MOVIMENTO: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  VALOR: number;

  @Column({ type: 'date', nullable: true })
  DATA_MOVIMENTO: Date;

  @Column({ type: 'time', nullable: true })
  HR_MOVIMENTO: string;

  @Column({ type: 'text', nullable: true })
  DESCRICAO: string;
}