import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity('ENDERECOS')
export class Endereco {
  @PrimaryGeneratedColumn()
  ID_ENDERECO: number;

  @Column()
  ID_PESSOA: number;

  @Column({ length: 150, nullable: true })
  LOGRADOURO: string;

  @Column({ length: 10, nullable: true })
  NUMERO: string;

  @Column({ length: 100, nullable: true })
  BAIRRO: string;

  @Column({ length: 100, nullable: true })
  CIDADE: string;

  @Column({ length: 2, nullable: true })
  UF: string;

  @Column({ length: 10, nullable: true })
  CEP: string;
}