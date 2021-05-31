import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ResultadoDto } from 'src/dto/resultado.dto';
import { Cliente } from './cliente.entity';
import { ClienteService } from './cliente.service';
import { ClienteCadastrarDto } from './dto/cliente.cadastrar.dto';

@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

    @Get('listar')
    async listar(): Promise<Cliente[]>{
        return this.clienteService.listar()
    }

    @Get(':id')
    async listarID(@Param('id') id: number): Promise<Cliente>{
        return this.clienteService.findOne(id)
    }

    

    @Post('cadastrar')
    async cadastrar(@Body() data: ClienteCadastrarDto): Promise<ResultadoDto>{
        return this.clienteService.cadastrar(data)
    }
}

