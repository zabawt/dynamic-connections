import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'root',
  password: 'root',
  database: 'poc',
  entities: [join(__dirname, 'src/**/*.entity.ts')],
  synchronize: false,
  autoLoadEntities: true,
  migrationsRun: false,
  logging: true,
  logger: 'advanced-console',
  keepConnectionAlive: true,
  applicationName: 'poc',
  cache: true,
  extra: {
    connectionLimit: 10,
    idleTimeoutMillis: 60000,
  },
};
