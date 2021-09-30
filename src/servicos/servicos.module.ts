import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ServicosController } from './servicos.controller';
import { servicosProviders } from './servicos.providers';
import { ServicosService } from './servicos.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ServicosController],
  providers: [
    ...servicosProviders,
    ServicosService,
  ],
})
export class ServicosModule {}