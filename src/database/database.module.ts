import { Inject, Injectable, Module, Request, Scope } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { REQUEST } from '@nestjs/core';
import {
  TypeOrmModule,
  TypeOrmModuleOptions,
  TypeOrmOptionsFactory,
} from '@nestjs/typeorm';
import { databaseConfig } from 'src/config/database.config';

@Injectable({ scope: Scope.REQUEST })
export class CustomTypeOrmOptionsFactory implements TypeOrmOptionsFactory {
  constructor(@Inject(REQUEST) private readonly request: Request) {}
  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    const defaultOpts = databaseConfig;
    console.error(typeof this.request.headers['demo-mode']);
    return this.request.headers['demo-mode'] === 'false'
      ? ({ ...defaultOpts, name: uuidv4() } as any)
      : { ...defaultOpts, database: 'poc_demo', name: uuidv4() };
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
