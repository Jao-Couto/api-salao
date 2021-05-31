import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ResultadoDto } from 'src/dto/resultado.dto';
import { Pagos } from './pagos.entity';
import { PagosService } from './pagos.service';
import { PagosCadastrarDto } from './dto/pagos.cadastrar.dto';

@Controller('pagos')
export class PagosController {
  constructor(private readonly pagosService: PagosService) {}

    @Get('listar')
    async listar(): Promise<Pagos[]>{
        return this.pagosService.listar()
    }

    @Post('cadastrar')
    async cadastrar(@Body() data: PagosCadastrarDto): Promise<ResultadoDto>{
        return this.pagosService.cadastrar(data)
    }

    @Get('data/:data')
    async listarData(@Param('data') data: string): Promise<Pagos[]>{
        return this.pagosService.listarData(data)
    }

    @Get('id/:id')
    async listarID(@Param('id') id: number): Promise<Pagos>{
        return this.pagosService.findOne(id)
    }
}