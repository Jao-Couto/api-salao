import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ResultadoDto } from 'src/dto/resultado.dto';
import { Usuario } from './usuario.entity';
import { UsuarioService } from './usuario.service';
import { UsuarioCadastrarDto } from './dto/usuario.cadastrar.dto';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

    @Get('listar')
    async listar(): Promise<Usuario[]>{
        return this.usuarioService.listar()
    }

    @Get(':id')
    async listarID(@Param('id') id: number): Promise<Usuario>{
        return this.usuarioService.findOne(id)
    }

    @Get(':email')
    async login(@Param('email') email: string): Promise<Usuario>{
        return this.usuarioService.login(email)
    }

    @Post('cadastrar')
    async cadastrar(@Body() data: UsuarioCadastrarDto): Promise<ResultadoDto>{
        return this.usuarioService.cadastrar(data)
    }
}

