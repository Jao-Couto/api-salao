import { Injectable, Inject } from '@nestjs/common';
import { ResultadoDto } from 'src/dto/resultado.dto';
import { Repository } from 'typeorm';
import { Atendimentos } from './atendimentos.entity';
import { AtendimentosCadastrarDto } from './dto/atendimentos.cadastrar.dto';

@Injectable()
export class AtendimentosService {
  constructor(
    @Inject('ATENDIMENTOS_REPOSITORY')
    private atendimentosRepository: Repository<Atendimentos>,
  ) {}

  async listar(user: number): Promise<Atendimentos[]> {
    return this.atendimentosRepository.query(
      `SELECT
            atendimentos.id AS id,
            atendimentos.data AS data,
            atendimentos.hora AS hora,
            atendimentos.valorTotal,
            cliente.nome AS nome,
            cliente.celular AS celular,
            group_concat(servicos.nome separator ', ') as servicos
        FROM
            atendimentos
        INNER JOIN cliente ON atendimentos.clienteId = cliente.id
        INNER JOIN servicos_marcados on servicos_marcados.atendimento_id = atendimentos.id 
        INNER JOIN servicos ON servicos.id = servicos_marcados.servico_id
        WHERE
            cliente.usuarioId = ` +
        user +
        ` AND NOT EXISTS (
            SELECT
                1
            FROM
                pagos
            WHERE
                pagos.atendimentoId = atendimentos.id
            ) AND NOT EXISTS(
              SELECT
                  1
              FROM
                  pendentes
              WHERE
                  pendentes.atendimentoId = atendimentos.id
              )
              GROUP BY atendimentos.id`,
    );
  }

  async listarData(data: string, user: number): Promise<Atendimentos[]> {
    return this.atendimentosRepository.query(
      `SELECT
            atendimentos.id AS id,
            atendimentos.data AS data,
            atendimentos.hora AS hora,
            atendimentos.valorTotal,
            cliente.nome AS nome,
            cliente.celular AS celular,
            group_concat(servicos.nome separator ', ') as servicos
        FROM
            atendimentos
        INNER JOIN cliente ON atendimentos.clienteId = cliente.id
        INNER JOIN servicos_marcados on servicos_marcados.atendimento_id = atendimentos.id 
        INNER JOIN servicos ON servicos.id = servicos_marcados.servico_id
        WHERE
            atendimentos.data = '` +
        data +
        `' AND cliente.usuarioId = ` +
        user +
        ` AND NOT EXISTS (
            SELECT
                1
            FROM
                pagos
            WHERE
                pagos.atendimentoId = atendimentos.id
            ) AND NOT EXISTS(
              SELECT
                  1
              FROM
                  pendentes
              WHERE
                  pendentes.atendimentoId = atendimentos.id
              )
        GROUP BY atendimentos.id
        ORDER BY atendimentos.hora`,
    );
  }

  async listarHora(data: string, user: number): Promise<Atendimentos[]> {
    return this.atendimentosRepository.query(
      `SELECT
            atendimentos.hora AS hora
        FROM
            atendimentos
            INNER JOIN cliente ON atendimentos.clienteId = cliente.id
            
        WHERE
            atendimentos.data = '` +
        data +
        `' AND cliente.usuarioId = ` +
        user +
        ` AND NOT EXISTS (
            SELECT
                1
            FROM
                pagos
            WHERE
                pagos.atendimentoId = atendimentos.id
            ) AND NOT EXISTS(
              SELECT
                  1
              FROM
                  pendentes
              WHERE
                  pendentes.atendimentoId = atendimentos.id
              )`,
    );
  }

  async findOne(id: number): Promise<Atendimentos> {
    return this.atendimentosRepository.findOne({
      id: id,
    });
  }

  async deletarId(id: number): Promise<ResultadoDto> {
    return this.atendimentosRepository
      .delete({ id: id })
      .then(() => {
        return <ResultadoDto>{
          status: true,
          mensagem: 'Horário Deletado',
        };
      })
      .catch((error) => {
        return <ResultadoDto>{
          status: false,
          mensagem: error,
        };
      });
  }

  async cadastrar(data: AtendimentosCadastrarDto): Promise<ResultadoDto> {
    const atendimento = new Atendimentos();
    atendimento.data = data.data;
    atendimento.hora = data.hora;
    atendimento.cliente = data.cliente;
    atendimento.valorTotal = data.valor;
    return this.atendimentosRepository
      .save(atendimento)
      .then((result) => {
        return <ResultadoDto>{
          status: true,
          mensagem: '' + result.id,
        };
      })
      .catch((error) => {
        return <ResultadoDto>{
          status: false,
          mensagem: error,
        };
      });
  }
}
