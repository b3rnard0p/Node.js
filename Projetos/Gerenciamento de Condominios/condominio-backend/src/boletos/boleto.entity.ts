import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('BOLETOS')
export class Boleto {
  @PrimaryGeneratedColumn()
  ID_BOLETO: number;

  @Column()
  ID_MORADOR: number;

  @Column('decimal', { precision: 10, scale: 2 })
  VL_BOLETO: number;

  @Column({ type: 'date' })
  DT_VENCIMENTO: Date;

  @Column({ length: 20, nullable: true })
  STATUS: string;
}