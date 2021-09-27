import { Atendimentos } from 'src/atendimentos/atendimentos.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany, Binary } from 'typeorm';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nome: string;
  
  @Column({ length: 100 })
  email: string;

  @Column({length: 128})
  salt: string;

  @Column({length: 128})
  senha: string;

  @Column({ length: 14 })
  cpf: string;

}