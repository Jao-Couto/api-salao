import { Connection, Repository } from 'typeorm';
import { Atendimentos } from './atendimentos.entity';


export const atendimentosProviders = [
  {
    provide: 'ATENDIMENTOS_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Atendimentos),
    inject: ['DATABASE_CONNECTION'],
  },
];