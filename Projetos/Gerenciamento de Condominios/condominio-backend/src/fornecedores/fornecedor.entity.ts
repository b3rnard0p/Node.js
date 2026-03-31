import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity('FORNECEDORES')
export class Fornecedor {
  @PrimaryGeneratedColumn()
  ID_FORNECEDOR: number;

  @Column()
  ID_PESSOA: number;

  @Column({ length: 100, nullable: true })
  AREA_ATUACAO: string;
}