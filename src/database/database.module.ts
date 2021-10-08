import { Inject, Module, Request } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

import {
  TypeOrmModule,
  TypeOrmModuleOptions,
  TypeOrmOptionsFactory,
} from '@nestjs/typeorm';

import { databaseConfig } from 'src/config/database.config';
import { UsersService } from 'src/users/users.service';

enum Connections {
  POC = 'poc',
  POC_DEMO = 'poc_demo',
}

export class CustomTypeOrmOptionsFactory implements TypeOrmOptionsFactory {
  constructor(@Inject(REQUEST) private readonly request: Request) {}
  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    const defaultOpts = databaseConfig;

    return this.request?.headers?.['demo-mode'] === 'true'
      ? ({
          ...defaultOpts,
          name: Connections.POC_DEMO,
          database: Connections.POC_DEMO,
        } as any)
      : {
          ...defaultOpts,
          database: Connections.POC,
          name: Connections.POC,
        };
  }
}

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [UsersService],
      useClass: CustomTypeOrmOptionsFactory,
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
