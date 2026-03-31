import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity('CONTRATOS_RH')
export class ContratoRh {
  @PrimaryGeneratedColumn()
  ID_CONTRATO_RH: number;

  @Column()
  ID_FUNCIONARIO: number;

  @Column({ type: 'text', nullable: true })
  DESCRICAO: string;

  @Column({ type: 'date', nullable: true })
  DATA_INICIO: Date;

  @Column({ type: 'date', nullable: true })
  DATA_FIM: Date;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  SALARIO_ACORDADO: number;
}