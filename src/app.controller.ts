import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';

import { AuthService } from './auth/auth.service';
import { UserLoginDto } from './user-login.dto';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Post('auth/login')
  async login(@Body() userLoginDto: UserLoginDto) {
    try {
      return await this.authService.login(userLoginDto);
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
