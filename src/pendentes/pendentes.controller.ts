import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ResultadoDto } from 'src/dto/resultado.dto';
import { Pendentes } from './pendentes.entity';
import { PendentesService } from './pendentes.service';
import { PendentesCadastrarDto } from './dto/pendentes.cadastrar.dto';

@Controller('pendentes')
export class PendentesController {
  constructor(private readonly pendentesService: PendentesService) {}


    @Post('cadastrar')
    async cadastrar(@Body() data: PendentesCadastrarDto): Promise<ResultadoDto>{
        return this.pendentesService.cadastrar(data)
    }

    @Get('listar:user')
    async listarPendentes(@Param('user') user:number): Promise<Pendentes[]>{
        return this.pendentesService.listarPendentes(user)
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