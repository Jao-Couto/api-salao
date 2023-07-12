import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ResultadoDto } from 'src/dto/resultado.dto';
import { Servicos } from './servicos.entity';
import { ServicosService } from './servicos.service';
import { ServicosCadastrarDto } from './dto/servicos.cadastrar.dto';

@Controller('servicos')
export class ServicosController {
  constructor(private readonly servicosService: ServicosService) {}

  @Get('listar/:user')
  async listar(@Param('user') user: number): Promise<Servicos[]> {
    return this.servicosService.listar(user);
  }

  @Post('cadastrar')
  async cadastrar(@Body() data: ServicosCadastrarDto): Promise<ResultadoDto> {
    return this.servicosService.cadastrar(data);
  }

  @Get('id/:id')
  async listarID(@Param('id') id: number): Promise<Servicos> {
    return this.servicosService.findOne(id);
  }

  @Delete('delete/:id')
  async deletarId(@Param('id') id: number): Promise<ResultadoDto> {
    return this.servicosService.deletarId(id);
  }
}
