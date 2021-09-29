import { Atendimentos } from 'src/atendimentos/atendimentos.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Pendentes {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Atendimentos, atendimento => atendimento.id) atendimento: number;
}