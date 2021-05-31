import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AtendimentosController } from './atendimentos.controller';
import { atendimentosProviders } from './atendimentos.providers';
import { AtendimentosService } from './atendimentos.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AtendimentosController],
  providers: [
    ...atendimentosProviders,
    AtendimentosService,
  ],
})
export class AtendimentosModule {}