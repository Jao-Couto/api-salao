import { Injectable, Inject } from '@nestjs/common';
import { ResultadoDto } from 'src/dto/resultado.dto';
import { Repository } from 'typeorm';
import { Pagos } from './pagos.entity';
import {PagosCadastrarDto } from './dto/pagos.cadastrar.dto';


@Injectable()
export class PagosService {
  constructor(
    @Inject('PAGOS_REPOSITORY')
    private pagosRepository: Repository<Pagos>,
  ) {}

  async listar(user: number): Promise<Pagos[]> {
    return this.pagosRepository
        .createQueryBuilder("pagos")
        .select('pagos.dataPago, pagos.id')
        .addSelect('atendimentos.data, atendimentos.hora ')
        .addSelect('cliente.nome', 'cliente_nome')
        .addSelect("servicos.nome", "servico")
        .addSelect("servicos.valor", "valor")
        .innerJoin("atendimentos", 'atendimentos', 'pagos.atendimento = atendimentos.id') 
        .innerJoin("cliente", 'cliente', 'atendimentos.cliente = cliente.id') 
        .innerJoin("servicos", "servicos", "atendimentos.servico = servicos.id")
        .where("cliente.usuario = '"+user+"'") 
        .orderBy("atendimentos.data", "ASC")
        .getRawMany();
  }

  async listarData(user: number, data: string): Promise<Pagos[]> {
    return this.pagosRepository
          .createQueryBuilder("pagos")
          .select('pagos.dataPago')
          .addSelect('atendimentos.*')
          .addSelect('cliente.nome', 'cliente_nome')
          .innerJoin("atendimentos", 'atendimentos', 'pagos.atendimento = atendimentos.id') 
          .innerJoin("cliente", 'cliente', 'atendimentos.cliente = cliente.id') 
          .where("cliente.usuario = '"+user+"'") 
          .where("atendimentos.data = '"+data+"'") 
          .orderBy("atendimentos.data", "ASC")
          .getRawMany();
            
  }

  async findOne(id: number): Promise<Pagos> {
    return this.pagosRepository.findOne({
      atendimento: id
    });
  }


  async cadastrar(data: PagosCadastrarDto): Promise<ResultadoDto>{
    let pagos = new Pagos();
    pagos.dataPago = data.dataPago
    pagos.atendimento = data.atendimento
    return this.pagosRepository.save(pagos)
    .then((result)=>{
        return <ResultadoDto>{
            status:true,
            mensagem: "Pago cadastrado"
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
