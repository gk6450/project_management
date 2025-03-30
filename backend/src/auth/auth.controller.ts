import { Controller, Post, Body, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body() body: { usernameOrEmail: string; password: string; role: string }
  ) {
    // Validate credentials and role (normal users cannot log in as admin)
    const user = await this.authService.validateUser(
      body.usernameOrEmail,
      body.password,
      body.role
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials or access denied');
    }
    return this.authService.login(user);
  }

  @Post('register')
  async register(
    @Body() body: { fullName: string; username: string; email: string; password: string; confirmPassword: string }
  ) {
    if (body.password !== body.confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }
    // Registration is allowed only for normal users. The role is forced to Viewer.
    return this.authService.register({
      fullName: body.fullName,
      username: body.username,
      email: body.email,
      password: body.password,
    });
  }
}
