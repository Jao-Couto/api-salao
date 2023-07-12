import { Usuario } from 'src/usuario/usuario.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Servicos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 126, nullable: false })
  nome: string;

  @Column('float', { nullable: false })
  valor: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.id) usuario: number;
}
