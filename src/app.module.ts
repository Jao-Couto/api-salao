import { Module } from '@nestjs/common';
import { ClienteModule } from './cliente/cliente.module';
import { AtendimentosModule } from './atendimentos/atendimentos.module';
import { PagosModule } from './pagos/pagos.module';
import { PendentesModule } from './pendentes/pendentes.module';
import { UsuarioModule } from './usuario/usuario.module';
import { ServicosModule } from './servicos/servicos.module';
import { ServicosMarcadosModule } from './servicosMarcados/servicosMarcados.module';

@Module({
  imports: [
    ClienteModule,
    AtendimentosModule,
    PagosModule,
    PendentesModule,
    UsuarioModule,
    ServicosModule,
    ServicosMarcadosModule,
  ],
})
export class AppModule {}
