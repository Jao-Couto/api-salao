import { Usuario } from 'src/usuario/usuario.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: false })
  nome: string;

  @Column({ length: 14, nullable: false, unique: true })
  cpf: string;

  @Column({ length: 50 })
  rua: string;

  @Column({ length: 50 })
  bairro: string;

  @Column('int')
  numero: number;

  @Column({ length: 50 })
  cidade: string;

  @Column({ length: 50 })
  celular: string;

  @Column({ length: 10 })
  nascimento: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.id) usuario: number;
}
