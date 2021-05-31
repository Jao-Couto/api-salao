import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { PagosController } from './pagos.controller';
import { pagosProviders } from './pagos.providers';
import { PagosService } from './pagos.service';

@Module({
  imports: [DatabaseModule],
  controllers: [PagosController],
  providers: [
    ...pagosProviders,
    PagosService,
  ],
})
export class PagosModule {}