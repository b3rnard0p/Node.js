import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity('PESSOAS')
export class Pessoa {
 @PrimaryGeneratedColumn()
 ID_PESSOA: number;
 @Column({ length: 150 })
 NOME: string;
 @Column({ length: 20 })
 TIPO_PESSOA: string;
 @Column({ unique: true, length: 20 })
 CPF_CNPJ: string;
 @Column()
 DATA_CADASTRO: Date;
}
