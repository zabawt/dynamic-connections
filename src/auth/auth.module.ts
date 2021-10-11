import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';

import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { UsersService } from 'src/users/users.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRATION_IN_SECONDS'),
        },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy, UsersService, ConfigService],
  exports: [AuthService],
})
export class AuthModule {}
