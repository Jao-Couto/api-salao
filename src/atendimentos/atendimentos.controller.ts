import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ResultadoDto } from 'src/dto/resultado.dto';
import { Atendimentos } from './atendimentos.entity';
import { AtendimentosService } from './atendimentos.service';
import { AtendimentosCadastrarDto } from './dto/atendimentos.cadastrar.dto';

@Controller('atendimentos')
export class AtendimentosController {
  constructor(private readonly atendimentosService: AtendimentosService) {}

  @Get('listar/:user')
  async listar(@Param('user') user: number): Promise<Atendimentos[]> {
    return this.atendimentosService.listar(user);
  }

  @Post('cadastrar')
  async cadastrar(
    @Body() data: AtendimentosCadastrarDto,
  ): Promise<ResultadoDto> {
    return this.atendimentosService.cadastrar(data);
  }

  @Get('data/:user/:data')
  async listarData(
    @Param('data') data: string,
    @Param('user') user: number,
  ): Promise<Atendimentos[]> {
    return this.atendimentosService.listarData(data, user);
  }

  @Get('hora/:user/:data')
  async listarHora(
    @Param('data') data: string,
    @Param('user') user: number,
  ): Promise<Atendimentos[]> {
    return this.atendimentosService.listarHora(data, user);
  }

  @Get('id/:id')
  async listarID(@Param('id') id: number): Promise<Atendimentos> {
    return this.atendimentosService.findOne(id);
  }

  @Delete('delete/:id')
  async deletarId(@Param('id') id: number): Promise<ResultadoDto> {
    return this.atendimentosService.deletarId(id);
  }
}
