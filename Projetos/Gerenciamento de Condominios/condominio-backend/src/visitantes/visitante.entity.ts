import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity('VISITANTES')
export class Visitante {
  @PrimaryGeneratedColumn()
  ID_VISITANTE: number;

  @Column()
  ID_PESSOA: number;

  @Column({ length: 20, nullable: true })
  DOCUMENTO: string;
}