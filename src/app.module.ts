import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClienteModule } from './cliente/cliente.module';
import { AtendimentosModule} from './atendimentos/atendimentos.module';
import { PagosModule } from './pagos/pagos.module';
import { PendentesModule } from './pendentes/pendentes.module';

@Module({
  imports: [ClienteModule, AtendimentosModule, PagosModule, PendentesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
