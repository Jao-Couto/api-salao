import { Cliente } from 'src/cliente/cliente.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne } from 'typeorm';

@Entity()
export class Atendimentos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('date', {nullable:false})
  data: string;

  @Column('time', {nullable:false})
  hora: string;

  @Column({length: 255, nullable:false})
  descricao: string;

  @Column('float', {nullable:false})
  valor: number;

  @ManyToOne(type => Cliente, cliente => cliente.id, {nullable:false}) cliente: number;
}