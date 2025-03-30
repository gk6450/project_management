import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(usernameOrEmail: string, password: string, role: string): Promise<any> {
    const user = await this.usersService.findByUsernameOrEmail(usernameOrEmail);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    if (role === 'Admin' && user.role !== 'Admin') {
      throw new UnauthorizedException('Access denied');
    }
    if (role === 'Viewer' && user.role === 'Admin') {
      throw new UnauthorizedException('Login as Admin!');
    }
    return user;
  }

  async login(user: any) {
    const payload = { username: user.username, role: user.role, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(userData: { fullName: string; username: string; email: string; password: string }): Promise<any> {
    const existingUser =
      (await this.usersService.findByUsernameOrEmail(userData.username)) ||
      (await this.usersService.findByUsernameOrEmail(userData.email));
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = await this.usersService.create({
      fullName: userData.fullName,
      username: userData.username,
      email: userData.email,
      password: hashedPassword,
      role: 'Viewer' // force viewer role on registration
    });
    return newUser;
  }
}
