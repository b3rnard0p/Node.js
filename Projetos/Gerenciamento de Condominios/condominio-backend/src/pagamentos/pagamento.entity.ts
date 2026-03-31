import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity('PAGAMENTOS')
export class Pagamento {
  @PrimaryGeneratedColumn()
  ID_PAGAMENTO: number;

  @Column()
  ID_CONTA_PAGAR: number;

  @Column({ type: 'date', nullable: true })
  DATA_PAGAMENTO: Date;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  VALOR_PAGO: number;

  @Column({ length: 30, nullable: true })
  FORMA_PAGAMENTO: string;
}