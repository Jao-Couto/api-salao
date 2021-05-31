import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ResultadoDto } from 'src/dto/resultado.dto';
import { Pendentes } from './pendentes.entity';
import { PendentesService } from './pendentes.service';
import { PendentesCadastrarDto } from './dto/pendentes.cadastrar.dto';

@Controller('pendentes')
export class PendentesController {
  constructor(private readonly pendentesService: PendentesService) {}

    @Get('asdsa')
    async listar(): Promise<Pendentes[]>{
        return this.pendentesService.listar()
    }

    @Post('cadastrar')
    async cadastrar(@Body() data: PendentesCadastrarDto): Promise<ResultadoDto>{
        return this.pendentesService.cadastrar(data)
    }

    @Get('listar')
    async listarPendentes(): Promise<Pendentes[]>{
        return this.pendentesService.listarPendentes()
    }

    @Get('id/:id')
    async listarID(@Param('id') id: number): Promise<Pendentes>{
        return this.pendentesService.findOne(id)
    }

    @Delete('delete/:id')
    async deletarId(@Param('id') id:number): Promise<ResultadoDto>{
        return this.pendentesService.deletarId(id)
    }
}