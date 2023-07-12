import { Atendimentos } from 'src/atendimentos/atendimentos.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Pagos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('datetime')
  dataPago: string;

  @ManyToOne(() => Atendimentos, (atendimento) => atendimento.id)
  atendimento: number;
}
