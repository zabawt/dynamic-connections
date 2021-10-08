import { Global, Inject, Module, Request } from '@nestjs/common';

import { REQUEST } from '@nestjs/core';
import {
  TypeOrmModule,
  TypeOrmModuleOptions,
  TypeOrmOptionsFactory,
} from '@nestjs/typeorm';

import { databaseConfig } from 'src/config/database.config';

enum Connections {
  POC = 'poc',
  POC_DEMO = 'poc_demo',
}

export class CustomTypeOrmOptionsFactory implements TypeOrmOptionsFactory {
  constructor(@Inject(REQUEST) private readonly request: Request) {}
  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    const defaultOpts = databaseConfig;

    return this.request.headers?.['demo-mode'] === 'false'
      ? ({ ...defaultOpts, name: Connections.POC } as any)
      : {
          ...defaultOpts,
          database: Connections.POC_DEMO,
          name: Connections.POC_DEMO,
        };
  }
}
@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: CustomTypeOrmOptionsFactory,
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
