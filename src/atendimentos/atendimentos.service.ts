import { Injectable, Inject } from '@nestjs/common';
import { ResultadoDto } from 'src/dto/resultado.dto';
import { createQueryBuilder, Repository } from 'typeorm';
import { Atendimentos } from './atendimentos.entity';
import { AtendimentosCadastrarDto } from './dto/atendimentos.cadastrar.dto';


@Injectable()
export class AtendimentosService {
  constructor(
    @Inject('ATENDIMENTOS_REPOSITORY')
    private atendimentosRepository: Repository<Atendimentos>,
  ) {}

  async listar(user:number): Promise<Atendimentos[]> {
    return this.atendimentosRepository
    .createQueryBuilder("atendimentos") 
    .select(['atendimentos', 'cliente.nome', 'cliente.id', 'cliente.celular'])
    .innerJoin("atendimentos.cliente", "cliente") 
    .where("cliente.usuario = "+user) 
    .getMany();
  }

  async listarData(data: string, user:number): Promise<Atendimentos[]> {
    return this.atendimentosRepository.query(
      `SELECT
            atendimentos.id AS atendimentos_id,
            atendimentos.data AS atendimentos_data,
            atendimentos.hora AS atendimentos_hora,
            atendimentos.descricao AS atendimentos_descricao,
            atendimentos.valor AS atendimentos_valor,
            atendimentos.clienteId AS atendimentos_clienteId,
            cliente.id AS cliente_id,
            cliente.nome AS cliente_nome,
            cliente.celular AS cliente_celular
        FROM
            atendimentos atendimentos
        INNER JOIN cliente cliente ON
            atendimentos.clienteId = cliente.id
        WHERE
            atendimentos.data = '`+data+`' AND cliente.usuarioId = `+user+` AND NOT EXISTS(
            SELECT
                1
            FROM
                pagos
            WHERE
                pagos.atendimentoId = atendimentos.id
            )`
      );
  }

  async findOne(id: number): Promise<Atendimentos> {
    return this.atendimentosRepository.findOne({
      id: id
    });
  }

  async deletarId(id: number): Promise<ResultadoDto>{
    return this.atendimentosRepository.delete({id:id})
    .then((result)=>{
      return <ResultadoDto>{
          status:true,
          mensagem: "Horário Deletado"
      }
  })
  .catch((error)=>{
      return <ResultadoDto>{
          status:false,
          mensagem: error
      }
  })
  }

  async cadastrar(data: AtendimentosCadastrarDto): Promise<ResultadoDto>{
    let atendimento = new Atendimentos();
    atendimento.data = data.data
    atendimento.hora = data.hora
    atendimento.descricao = data.descricao
    atendimento.valor = data.valor
    atendimento.cliente = data.cliente
    return this.atendimentosRepository.save(atendimento)
    .then((result)=>{
        return <ResultadoDto>{
            status:true,
            mensagem: "Horário marcado"
        }
    })
    .catch((error)=>{
        return <ResultadoDto>{
            status:false,
            mensagem: error
        }
    })
  }

}
