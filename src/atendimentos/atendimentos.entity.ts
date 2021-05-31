import { Cliente } from 'src/cliente/cliente.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne } from 'typeorm';

@Entity()
export class Atendimentos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('date')
  data: string;

  @Column('time')
  hora: string;

  @Column({length: 255})
  descricao: string;

  @Column('float')
  valor: number;

  @ManyToOne(type => Cliente, cliente => cliente.id) cliente: number;
}