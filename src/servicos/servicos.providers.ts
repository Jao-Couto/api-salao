import { Connection, Repository } from 'typeorm';
import { Servicos } from './servicos.entity';


export const servicosProviders = [
  {
    provide: 'SERVICOS_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Servicos),
    inject: ['DATABASE_CONNECTION'],
  },
];