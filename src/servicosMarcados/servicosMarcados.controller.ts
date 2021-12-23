import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ResultadoDto } from 'src/dto/resultado.dto';
import { ServicosMarcados } from './servicosMarcados.entity';
import { ServicosMarcadosService } from './servicosMarcados.service';
import { ServicosMarcadosCadastrarDto } from './dto/servicosMarcados.cadastrar.dto';

@Controller('servicosMarcados')
export class ServicosMarcadosController {
    constructor(private readonly servicosMarcadosService: ServicosMarcadosService) { }

    @Get()
    getHello(): string {
        return this.servicosMarcadosService.getHello();
    }

    @Get('listar/:atendimento')
    async listar(@Param("atendimento") atendimento: number): Promise<ServicosMarcados[]> {
        return this.servicosMarcadosService.listar(atendimento)
    }

    @Post('cadastrar')
    async cadastrar(@Body() data: ServicosMarcadosCadastrarDto): Promise<ResultadoDto> {
        return this.servicosMarcadosService.cadastrar(data)
    }

    @Delete('delete/:id')
    async deletarId(@Param('id') id: number): Promise<ResultadoDto> {
        return this.servicosMarcadosService.deletarId(id)
    }
}