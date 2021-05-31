import { Connection, Repository } from 'typeorm';
import { Pagos } from './pagos.entity';


export const pagosProviders = [
  {
    provide: 'PAGOS_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Pagos),
    inject: ['DATABASE_CONNECTION'],
  },
];