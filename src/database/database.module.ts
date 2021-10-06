import { Inject, Module, Request } from '@nestjs/common';

import { REQUEST } from '@nestjs/core';
import {
  TypeOrmModule,
  TypeOrmModuleOptions,
  TypeOrmOptionsFactory,
} from '@nestjs/typeorm';
import { databaseConfig } from 'src/config/database.config';

export class CustomTypeOrmOptionsFactory implements TypeOrmOptionsFactory {
  constructor(@Inject(REQUEST) private readonly request: Request) {}
  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    const defaultOpts = databaseConfig;

    return this.request.headers['demo-mode'] === 'false'
      ? ({ ...defaultOpts, name: 'poc' } as any)
      : { ...defaultOpts, database: 'poc_demo', name: 'poc_demo' };
  }
}
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: CustomTypeOrmOptionsFactory,
    }),
  ],
})
export class DatabaseModule {}
