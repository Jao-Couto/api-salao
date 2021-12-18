import { Cliente } from 'src/cliente/cliente.entity';
import { Servicos } from 'src/servicos/servicos.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne } from 'typeorm';

@Entity()
export class Atendimentos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('date', { nullable: false })
  data: string;

  @Column('time', { nullable: false })
  hora: string;

  @Column('float', { nullable: false })
  valorTotal: number;

  @ManyToOne(type => Cliente, cliente => cliente.id, { nullable: false }) cliente: number;
}