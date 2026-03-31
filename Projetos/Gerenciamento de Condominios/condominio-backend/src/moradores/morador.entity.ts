import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity('MORADORES')
export class Morador {
  @PrimaryGeneratedColumn()
  ID_MORADOR: number;

  @Column()
  ID_PESSOA: number;

  @Column()
  ID_UNIDADE: number;
}