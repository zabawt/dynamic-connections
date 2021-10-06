import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'root',
  password: 'root',
  database: 'poc',
  entities: [User],
  synchronize: false,
  autoLoadEntities: true,
  migrationsRun: false,
  logging: true,
  logger: 'advanced-console',
  keepConnectionAlive: true,
  extra: {
    connectionLimit: 10,
    idleTimeoutMillis: 60000,
  },
};
