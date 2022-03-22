import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ResultadoDto } from 'src/dto/resultado.dto';
import { Cliente } from './cliente.entity';
import { ClienteService } from './cliente.service';
import { ClienteCadastrarDto } from './dto/cliente.cadastrar.dto';

@Controller('cliente')
export class ClienteController {
    constructor(private readonly clienteService: ClienteService) { }

    @Get('listar:user')
    async listar(@Param('user') user: number): Promise<Cliente[]> {
        return this.clienteService.listar(user)
    }

    @Get(':user/:id')
    async listarID(@Param('user') user: number, @Param('id') id: number): Promise<Cliente> {
        return this.clienteService.findOne(user, id)
    }

    @Post('cadastrar')
    async cadastrar(@Body() data: ClienteCadastrarDto): Promise<ResultadoDto> {
        return this.clienteService.cadastrar(data)
    }

    @Delete('delete/:id')
    async deletarId(@Param('id') id: number): Promise<ResultadoDto> {
        console.log(id);

        return this.clienteService.deletarId(id)
    }

    @Post('update')
    async update(@Body() data: ClienteCadastrarDto): Promise<ResultadoDto> {
        return this.clienteService.update(data)
    }
}

