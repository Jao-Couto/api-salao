import { Injectable, Inject } from '@nestjs/common';
import { ResultadoDto } from '../dto/resultado.dto';
import { Repository } from 'typeorm';
import { Cliente } from './cliente.entity';
import { ClienteCadastrarDto } from './dto/cliente.cadastrar.dto';

@Injectable()
export class ClienteService {
  constructor(
    @Inject('CLIENTE_REPOSITORY')
    private clienteRepository: Repository<Cliente>,
  ) {}

  async listar(user: number): Promise<Cliente[]> {
    return this.clienteRepository.find({
      usuario: user
    });
  }

  async findOne(user:number, id: number): Promise<Cliente> {
    return this.clienteRepository.findOne({
      id: id,
      usuario: user
    });
  }

  

  async cadastrar(data: ClienteCadastrarDto): Promise<ResultadoDto>{
    console.log(data);
    
    let cliente = new Cliente();
    cliente.nome = data.nome
    cliente.cpf = data.cpf
    cliente.rua= data.rua
    cliente.bairro= data.bairro
    cliente.numero= data.numero
    cliente.cidade= data.cidade
    cliente.celular= data.celular
    cliente.nascimento= data.nascimento
    cliente.usuario = data.usuario
    return this.clienteRepository.save(cliente)
    .then((result)=>{
        return <ResultadoDto>{
            status:true,
            mensagem: "Cliente cadastrado"
        }
    })
    .catch((error)=>{
        return <ResultadoDto>{
            status:false,
            mensagem: "Houve um erro no cadastro do cliente"
        }
    })
  }
}