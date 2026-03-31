import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('FUNCIONARIOS')
export class Funcionario {
  @PrimaryGeneratedColumn()
  ID_FUNCIONARIO: number;

  @Column()
  ID_PESSOA: number;

  @Column({ length: 50, nullable: true })
  FUNCAO: string;

  @Column({ type: 'date', nullable: true })
  DATA_ADMISSAO: Date;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  SALARIO: number;
}