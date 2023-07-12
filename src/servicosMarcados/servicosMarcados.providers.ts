import { Connection } from 'typeorm';
import { ServicosMarcados } from './servicosMarcados.entity';

export const servicosMarcadosProviders = [
  {
    provide: 'SERVICOSMARCADOS_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(ServicosMarcados),
    inject: ['DATABASE_CONNECTION'],
  },
];
