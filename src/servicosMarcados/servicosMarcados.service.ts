import { Injectable, Inject } from '@nestjs/common';
import { ResultadoDto } from 'src/dto/resultado.dto';
import { createQueryBuilder, Repository } from 'typeorm';
import { ServicosMarcados } from './servicosMarcados.entity';
import { ServicosMarcadosCadastrarDto } from './dto/servicosMarcados.cadastrar.dto';


@Injectable()
export class ServicosMarcadosService {
  constructor(
    @Inject('SERVICOSMARCADOS_REPOSITORY')
    private servicosMarcadosRepository: Repository<ServicosMarcados>,
  ) { }

  getHello(): string {
    return 'Hello World!';
  }

  async listar(atendimento: number): Promise<ServicosMarcados[]> {
    return this.servicosMarcadosRepository.query(
      `SELECT
      servicos.nome
  FROM
      servicos_marcados
    INNER JOIN servicos ON servicos.id = servicos_marcados.servico_id
  WHERE
    servicos_marcados.atendimento_id = '`+ atendimento + `' `
    );
  }

  async find(id: number): Promise<ServicosMarcados[]> {
    return this.servicosMarcadosRepository.find({ where: { atendimento: id } });
  }

  async deletarId(id: number): Promise<ResultadoDto> {
    return this.servicosMarcadosRepository.delete({ atendimento: id })
      .then((result) => {
        return <ResultadoDto>{
          status: true,
          mensagem: "Serviço Deletado"
        }
      })
      .catch((error) => {
        return <ResultadoDto>{
          status: false,
          mensagem: error
        }
      })
  }

  async cadastrar(data: ServicosMarcadosCadastrarDto): Promise<ResultadoDto> {
    let servico = new ServicosMarcados();
    servico.atendimento_id = data.atendimento
    servico.servico_id = data.servico
    console.log(servico);

    return this.servicosMarcadosRepository.save(servico)
      .then((result) => {
        return <ResultadoDto>{
          status: true,
          mensagem: "Serviço cadastrado"
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
