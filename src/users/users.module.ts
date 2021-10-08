import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';

import { UsersController } from './users.controller';

import { DatabaseModule } from 'src/database/database.module';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), DatabaseModule],
  providers: [UsersService],
  exports: [UsersService, DatabaseModule],
  controllers: [UsersController],
})
export class UsersModule {}
