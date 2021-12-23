import { Injectable, Inject } from '@nestjs/common';
import { ResultadoDto } from 'src/dto/resultado.dto';
import { Repository } from 'typeorm';
import { Pagos } from './pagos.entity';
import { PagosCadastrarDto } from './dto/pagos.cadastrar.dto';


@Injectable()
export class PagosService {
  constructor(
    @Inject('PAGOS_REPOSITORY')
    private pagosRepository: Repository<Pagos>,
  ) { }

  async listar(user: number): Promise<Pagos[]> {
    return this.pagosRepository.query(
      `SELECT 
        atendimentos.data, 
        atendimentos.hora, 
        pagos.id, 
        cliente.nome as cliente_nome, 
        cliente.celular, 
        pagos.dataPago,
        atendimentos.valorTotal as valorTotal, 
        group_concat(servicos.nome separator ', ') as servicos
      FROM pagos
        INNER JOIN atendimentos on pagos.atendimentoId = atendimentos.id
        INNER JOIN cliente on atendimentos.clienteId = cliente.id
        INNER JOIN servicos_marcados on atendimentos.id = servicos_marcados.atendimento_id
        INNER JOIN servicos on servicos.id = servicos_marcados.servico_id
      WHERE 
        cliente.usuarioId = '` + user + `'
      GROUP BY atendimentos.id
      ORDER BY atendimentos.data ASC
      `)
  }

  async listarData(user: number, data: string): Promise<Pagos[]> {
    return this.pagosRepository
      .createQueryBuilder("pagos")
      .select('pagos.dataPago')
      .addSelect('atendimentos.*')
      .addSelect('cliente.nome', 'cliente_nome')
      .innerJoin("atendimentos", 'atendimentos', 'pagos.atendimento = atendimentos.id')
      .innerJoin("cliente", 'cliente', 'atendimentos.cliente = cliente.id')
      .where("cliente.usuario = '" + user + "'")
      .where("atendimentos.data = '" + data + "'")
      .orderBy("atendimentos.data", "ASC")
      .getMany();

  }

  async findOne(id: number): Promise<Pagos> {
    return this.pagosRepository.findOne({
      atendimento: id
    });
  }


  async cadastrar(data: PagosCadastrarDto): Promise<ResultadoDto> {
    let pagos = new Pagos();
    pagos.dataPago = data.dataPago
    pagos.atendimento = data.atendimento
    return this.pagosRepository.save(pagos)
      .then((result) => {
        return <ResultadoDto>{
          status: true,
          mensagem: "Pago cadastrado"
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
