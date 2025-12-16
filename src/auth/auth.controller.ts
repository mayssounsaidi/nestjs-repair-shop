import { Controller, Post, Body, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private usersService: UsersService) {}

  @Post('register')
  async register(@Body() body: any, @Request() req: any) {
    const creatorRole = req.user?.role;
    return this.authService.register(body, creatorRole);
  }

  @Post('login')
  async login(@Body() body: any) {
    return this.authService.login(body.email, body.password);
  }
}
