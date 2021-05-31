import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { PendentesController } from './pendentes.controller';
import { pendentesProviders } from './pendentes.providers';
import { PendentesService } from './pendentes.service';

@Module({
  imports: [DatabaseModule],
  controllers: [PendentesController],
  providers: [
    ...pendentesProviders,
    PendentesService,
  ],
})
export class PendentesModule {}