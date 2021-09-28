import { Atendimentos } from 'src/atendimentos/atendimentos.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity()
export class Pagos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('datetime')
  dataPago: string;

  @ManyToOne(type => Atendimentos, atendimento => atendimento.id) atendimento: number;
}