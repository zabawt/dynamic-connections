import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, OnModuleInit } from '@nestjs/common';

import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';

import { ModuleRef } from '@nestjs/core';

export class JWTPayload {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;
}

@Injectable()
export class JwtStrategy
  extends PassportStrategy(Strategy)
  implements OnModuleInit
{
  private usersService: UsersService;

  constructor(
    private moduleRef: ModuleRef,
    readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }
  async onModuleInit() {
    this.usersService = await this.moduleRef.resolve(UsersService);
  }

  async validate({ id, firstname, lastname }: JWTPayload) {
    const user = await this.usersService.findOne(id);
    return {
      id,
      firstname,
      lastname,
    };
  }
}
