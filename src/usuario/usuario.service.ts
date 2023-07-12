import { Injectable, Inject } from '@nestjs/common';
import { ResultadoDto } from '../dto/resultado.dto';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import { UsuarioCadastrarDto } from './dto/usuario.cadastrar.dto';
import { genSalt, hash, compare } from 'bcrypt';
import { UsuarioLoginDto } from './dto/usuario.login.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @Inject('USUARIO_REPOSITORY')
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async listar(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  async login(data: UsuarioLoginDto): Promise<ResultadoDto> {
    const usuario = this.usuarioRepository.findOne({
      email: data.email,
    });

    if ((await usuario) != undefined) {
      const isMatch = await compare(data.senha, (await usuario).senha);
      const id = (await usuario).id;
      if (isMatch)
        return <ResultadoDto>{
          status: true,
          mensagem: id.toString(),
        };
    } else
      return <ResultadoDto>{
        status: false,
        mensagem: 'Senha e/ou email incorreto',
      };
  }

  async findOne(id: number): Promise<Usuario> {
    return this.usuarioRepository.findOne({
      id: id,
    });
  }

  async cadastrar(data: UsuarioCadastrarDto): Promise<ResultadoDto> {
    const usuario = new Usuario();
    usuario.nome = data.nome;
    usuario.cpf = data.cpf;
    usuario.email = data.email;
    const salt = await genSalt();
    const senha = await hash(data.senha, salt);
    usuario.senha = senha;

    return this.usuarioRepository
      .save(usuario)
      .then(() => {
        return <ResultadoDto>{
          status: true,
          mensagem: 'Usuario cadastrado',
        };
      })
      .catch((error) => {
        return <ResultadoDto>{
          status: false,
          mensagem: 'Houve um erro no cadastro do usuario ' + error,
        };
      });
  }
}
