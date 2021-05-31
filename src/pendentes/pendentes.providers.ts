import { Connection, Repository } from 'typeorm';
import { Pendentes } from './pendentes.entity';


export const pendentesProviders = [
  {
    provide: 'PENDENTES_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Pendentes),
    inject: ['DATABASE_CONNECTION'],
  },
];