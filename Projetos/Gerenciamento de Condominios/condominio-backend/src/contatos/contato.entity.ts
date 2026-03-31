import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity('CONTATOS')
export class Contato {
  @PrimaryGeneratedColumn()
  ID_CONTATO: number;

  @Column()
  ID_PESSOA: number;

  @Column({ length: 20 })
  TIPO_CONTATO: string;

  @Column({ length: 100 })
  VALOR_CONTATO: string;
}