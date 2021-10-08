import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from 'src/user-login.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async validateUser(firstName: string): Promise<User> {
    return this.usersService.findByName(firstName);
  }

  async login(userLoginDto: UserLoginDto) {
    const { id, firstName, lastName } = await this.validateUser(
      userLoginDto.firstName,
    );

    const payload = {
      id,
      firstName,
      lastName,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
