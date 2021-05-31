import { Injectable, Inject } from '@nestjs/common';
import { ResultadoDto } from 'src/dto/resultado.dto';
import { Repository } from 'typeorm';
import { Pendentes } from './pendentes.entity';
import {PendentesCadastrarDto } from './dto/pendentes.cadastrar.dto';


@Injectable()
export class PendentesService {
  constructor(
    @Inject('PENDENTES_REPOSITORY')
    private pendentesRepository: Repository<Pendentes>,
  ) {}

  async listar(): Promise<Pendentes[]> {
    return this.pendentesRepository.find();
  }

  async listarPendentes(): Promise<Pendentes[]> {
    return this.pendentesRepository
          .createQueryBuilder("pendentes") 
          .select(['pendentes', 'cliente.nome'])  
          .innerJoin("pendentes.cliente", "cliente") 
          .orderBy("pendentes.data", "ASC")
          .getMany();
  }

  async findOne(id: number): Promise<Pendentes> {
    return this.pendentesRepository.findOne({
      id: id
    });
  }

  async deletarId(id: number): Promise<ResultadoDto>{
    return this.pendentesRepository.delete({id:id})
    .then((result)=>{
      return <ResultadoDto>{
          status:true,
          mensagem: "Pendente Deletado"
      }
  })
  .catch((error)=>{
      return <ResultadoDto>{
          status:false,
          mensagem: error
      }
  })
  }


  async cadastrar(data: PendentesCadastrarDto): Promise<ResultadoDto>{
    let pendentes = new Pendentes();
    pendentes.data = data.data
    pendentes.hora = data.hora
    pendentes.descricao = data.descricao
    pendentes.valor = data.valor
    pendentes.cliente = data.cliente
    return this.pendentesRepository.save(pendentes)
    .then((result)=>{
        return <ResultadoDto>{
            status:true,
            mensagem: "Pendente cadastrado"
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
