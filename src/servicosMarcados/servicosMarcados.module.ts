import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ServicosMarcadosController } from './servicosMarcados.controller';
import { servicosMarcadosProviders } from './servicosMarcados.providers';
import { ServicosMarcadosService } from './servicosMarcados.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ServicosMarcadosController],
  providers: [...servicosMarcadosProviders, ServicosMarcadosService],
})
export class ServicosMarcadosModule {}
