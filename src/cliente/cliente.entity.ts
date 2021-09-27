import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany } from 'typeorm';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  nome: string;

  @Column({ length: 14 })
  cpf: string;

  @Column({ length: 50 })
  rua: string;

  @Column({ length: 50 })
  bairro: string;

  @Column('int')
  numero: number;

  @Column({ length: 50 })
  cidade: string;

  @Column({ length: 50 })
  celular: string;;

  @Column({ length: 10 })
  nascimento: string;

}