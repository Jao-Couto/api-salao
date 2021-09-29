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

  async listarPendentes(user:number): Promise<Pendentes[]> {
    return this.pendentesRepository
          .createQueryBuilder("pendentes")
          .addSelect('atendimentos.*')
          .addSelect('cliente.nome', 'cliente_nome')
          .innerJoin("atendimentos", 'atendimentos', 'pendentes.atendimento = atendimentos.id') 
          .innerJoin("cliente", 'cliente', 'atendimentos.cliente = cliente.id') 
          .where("cliente.usuario = '"+user+"'") 
          .orderBy("atendimentos.data", "ASC")
          .getRawMany();
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
    pendentes.atendimento = data.atendimento
    return this.pendentesRepository.save(pendentes)
    .then((result)=>{
        return <ResultadoDto>{
            status:true,
            mensagem: "Fiado cadastrado"
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
