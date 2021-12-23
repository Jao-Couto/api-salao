import { Injectable, Inject } from '@nestjs/common';
import { ResultadoDto } from 'src/dto/resultado.dto';
import { Repository } from 'typeorm';
import { Pendentes } from './pendentes.entity';
import { PendentesCadastrarDto } from './dto/pendentes.cadastrar.dto';


@Injectable()
export class PendentesService {
  constructor(
    @Inject('PENDENTES_REPOSITORY')
    private pendentesRepository: Repository<Pendentes>,
  ) { }

  async listar(): Promise<Pendentes[]> {
    return this.pendentesRepository.find();
  }

  async listarPendentes(user: number): Promise<Pendentes[]> {
    return this.pendentesRepository.query(
      `SELECT 
        atendimentos.data, 
        atendimentos.hora, 
        pendentes.id as pendentes_id, 
        cliente.nome as cliente_nome, 
        cliente.celular, 
        atendimentos.valorTotal as valorTotal, 
        group_concat(servicos.nome separator ', ') as servicos
      FROM pendentes
        INNER JOIN atendimentos on pendentes.atendimentoId = atendimentos.id
        INNER JOIN cliente on atendimentos.clienteId = cliente.id
        INNER JOIN servicos_marcados on atendimentos.id = servicos_marcados.atendimento_id
        INNER JOIN servicos on servicos.id = servicos_marcados.servico_id
      WHERE 
        cliente.usuarioId = '` + user + `'
      GROUP BY atendimentos.id
      ORDER BY atendimentos.data ASC
      `)
  }

  async findOne(id: number): Promise<Pendentes> {
    return this.pendentesRepository.findOne({
      id: id
    });
  }

  async deletarId(id: number): Promise<ResultadoDto> {
    return this.pendentesRepository.delete({ id: id })
      .then((result) => {
        return <ResultadoDto>{
          status: true,
          mensagem: "Pendente Deletado"
        }
      })
      .catch((error) => {
        return <ResultadoDto>{
          status: false,
          mensagem: error
        }
      })
  }


  async cadastrar(data: PendentesCadastrarDto): Promise<ResultadoDto> {
    let pendentes = new Pendentes();
    pendentes.atendimento = data.atendimento
    return this.pendentesRepository.save(pendentes)
      .then((result) => {
        return <ResultadoDto>{
          status: true,
          mensagem: "Fiado cadastrado"
        }
      })
      .catch((error) => {
        return <ResultadoDto>{
          status: false,
          mensagem: error
        }
      })
  }

}
