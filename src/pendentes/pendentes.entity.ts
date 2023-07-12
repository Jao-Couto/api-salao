import { Atendimentos } from 'src/atendimentos/atendimentos.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Pendentes {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Atendimentos, (atendimento) => atendimento.id)
  atendimento: number;
}
