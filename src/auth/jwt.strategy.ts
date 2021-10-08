import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Scope } from '@nestjs/common';

import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { UserRepository } from 'src/users/user.repository';

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

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'and0U2VjcmV0',
    });
  }

  async validate({ id, firstname, lastname }: JWTPayload) {
    // const user = this.usersService.findAll();

    return {
      id,
      firstname,
      lastname,
    };
  }
}
