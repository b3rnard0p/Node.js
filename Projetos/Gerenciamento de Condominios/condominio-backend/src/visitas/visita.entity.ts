import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity('VISITAS')
export class Visita {
  @PrimaryGeneratedColumn()
  ID_VISITA: number;

  @Column()
  ID_VISITANTE: number;

  @Column()
  ID_UNIDADE: number;

  @Column()
  ID_MORADOR_AUTORIZACAO: number;

  @Column({ length: 10, nullable: true })
  PLACA_VEICULO: string;

  @Column({ type: 'datetime', nullable: true })
  DATA_ENTRADA: Date;

  @Column({ type: 'datetime', nullable: true })
  DATA_SAIDA: Date;
}