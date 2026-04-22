import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('USUARIOS')
export class Usuario {
  @PrimaryGeneratedColumn()
  ID_USUARIO: number;

  @Column()
  NOME: string;

  @Column({ length: 150 })
  CPF: string;

  @Column()
  password: string;
}