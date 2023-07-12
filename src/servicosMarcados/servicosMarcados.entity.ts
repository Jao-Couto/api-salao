import { Atendimentos } from 'src/atendimentos/atendimentos.entity';
import { Servicos } from 'src/servicos/servicos.entity';
import { Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class ServicosMarcados {
  @PrimaryColumn()
  atendimento_id: number;

  @PrimaryColumn()
  servico_id: number;

  @OneToMany(() => Atendimentos, (atendimento) => atendimento.id)
  atendimento: number;
  @JoinColumn({ name: 'atendimento_id' })
  public atendimentos!: Atendimentos;

  @OneToMany(() => Servicos, (servico) => servico.id) servico: number;
  @JoinColumn({ name: 'servico_id' })
  public servicos!: Servicos;
}
