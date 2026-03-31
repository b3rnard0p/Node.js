import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity('COMUNICADOS')
export class Comunicado {
  @PrimaryGeneratedColumn()
  ID_COMUNICADO: number;

  @Column({ length: 100 })
  TITULO: string;

  @Column({ type: 'text' })
  MENSAGEM: string;

  @Column({ type: 'date' })
  DT_COMUNICADO: Date;

  @Column({ type: 'time', nullable: true })
  HR_COMUNICADO: string;

  @Column({ length: 30, nullable: true })
  TIPO: string;
}