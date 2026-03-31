import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity('RESERVAS')
export class Reserva {
  @PrimaryGeneratedColumn()
  ID_RESERVA: number;

  @Column()
  ID_AREA_COMUM: number;

  @Column()
  ID_MORADOR: number;

  @Column({ type: 'date' })
  DATA_RESERVA: Date;

  @Column({ type: 'time', nullable: true })
  HR_INICIO: string;

  @Column({ type: 'time', nullable: true })
  HR_FIM: string;
}