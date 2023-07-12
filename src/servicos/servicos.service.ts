import { Injectable, Inject } from '@nestjs/common';
import { ResultadoDto } from 'src/dto/resultado.dto';
import { Repository } from 'typeorm';
import { Servicos } from './servicos.entity';
import { ServicosCadastrarDto } from './dto/servicos.cadastrar.dto';

@Injectable()
export class ServicosService {
  constructor(
    @Inject('SERVICOS_REPOSITORY')
    private servicosRepository: Repository<Servicos>,
  ) {}

  async listar(user: number): Promise<Servicos[]> {
    return this.servicosRepository
      .createQueryBuilder('servicos')
      .select(['servicos'])
      .where('servicos.usuario = ' + user)
      .getMany();
  }

  async findOne(id: number): Promise<Servicos> {
    return this.servicosRepository.findOne({
      id: id,
    });
  }

  async deletarId(id: number): Promise<ResultadoDto> {
    return this.servicosRepository
      .delete({ id: id })
      .then(() => {
        return <ResultadoDto>{
          status: true,
          mensagem: 'Serviço Deletado',
        };
      })
      .catch((error) => {
        return <ResultadoDto>{
          status: false,
          mensagem: error,
        };
      });
  }

  async cadastrar(data: ServicosCadastrarDto): Promise<ResultadoDto> {
    const servico = new Servicos();
    servico.nome = data.nome;
    servico.valor = data.valor;
    servico.usuario = data.usuario;
    return this.servicosRepository
      .save(servico)
      .then(() => {
        return <ResultadoDto>{
          status: true,
          mensagem: 'Serviço cadastrado',
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
