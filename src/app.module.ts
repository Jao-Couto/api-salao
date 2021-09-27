import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClienteModule } from './cliente/cliente.module';
import { AtendimentosModule} from './atendimentos/atendimentos.module';
import { PagosModule } from './pagos/pagos.module';
import { PendentesModule } from './pendentes/pendentes.module';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [ClienteModule, AtendimentosModule, PagosModule, PendentesModule, UsuarioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
