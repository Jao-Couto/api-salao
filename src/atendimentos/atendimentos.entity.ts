import { Cliente } from 'src/cliente/cliente.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

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

  @ManyToOne(() => Cliente, (cliente) => cliente.id, { nullable: false })
  cliente: number;
}
