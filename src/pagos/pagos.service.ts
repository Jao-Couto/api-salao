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

  async listar(): Promise<Pagos[]> {
      return this.pagosRepository
            .createQueryBuilder("pagos") 
            .select(['pagos', 'cliente.nome'])  
            .innerJoin("pagos.cliente", "cliente") 
            .orderBy("pagos.data", "ASC")
            .getMany();
    
  }

  async listarData(data: string): Promise<Pagos[]> {
    return this.pagosRepository
          .createQueryBuilder("pagos") 
          .select(['pagos', 'cliente.nome'])  
          .innerJoin("pagos.cliente", "cliente") 
          .where("pagos.data = '"+data+"'") 
          .getMany();
  }

  async findOne(id: number): Promise<Pagos> {
    return this.pagosRepository.findOne({
      id: id
    });
  }


  async cadastrar(data: PagosCadastrarDto): Promise<ResultadoDto>{
    let pagos = new Pagos();
    pagos.data = data.data
    pagos.dataPago = data.dataPago
    pagos.hora = data.hora
    pagos.descricao = data.descricao
    pagos.valor = data.valor
    pagos.cliente = data.cliente
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
