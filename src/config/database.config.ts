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
  synchronize: true,
  autoLoadEntities: true,
  migrationsRun: true,
  logging: true,
  name: 'first',
  logger: 'advanced-console',
  keepConnectionAlive: true,
  cache: false,
};
