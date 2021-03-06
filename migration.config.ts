import { join } from 'path';

import { ConnectionOptions } from 'typeorm';

const databaseConnectionOptions: ConnectionOptions[] = [
  {
    type: 'postgres',
    host: 'localhost',
    username: 'root',
    password: 'root',
    database: 'poc',
    logging: true,
    synchronize: false,
    port: 5432,
    entities: [join(__dirname, 'src/**/*.entity.ts')],
    migrations: [join(__dirname, 'src/migrations/*.ts')],
    migrationsRun: true,
    cli: {
      migrationsDir: 'src/migrations',
      entitiesDir: 'src/**/*.entity.ts',
    },
  },
  {
    type: 'postgres',
    host: 'localhost',
    username: 'root',
    password: 'root',
    database: 'poc_demo',
    name: 'poc_demo',
    logging: true,
    synchronize: false,
    port: 5432,
    entities: [join(__dirname, 'src/**/*.entity.ts')],
    migrations: [join(__dirname, 'src/migrations/*.ts')],
    migrationsRun: true,
    cli: {
      migrationsDir: 'src/migrations',
      entitiesDir: 'src/**/*.entity.ts',
    },
  },
];
export = databaseConnectionOptions;
