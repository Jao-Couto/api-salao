import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () =>
      await createConnection({
        type: 'mysql',
        host: 'us-cdbr-east-04.cleardb.com',
        username: 'b01b138a733528',
        password: '9bb8ffa5',
        database: 'heroku_9acee264d36c327',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
  },
];
