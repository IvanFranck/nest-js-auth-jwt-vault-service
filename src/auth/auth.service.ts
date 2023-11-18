import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtServive: JwtService,
  ) {}
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    } else {
      return null;
    }
  }

  async login(user: any, response: Response): Promise<void> {
    const payload = { username: user.username, sub: user.userId };

    const expires = new Date();
    expires.setSeconds(expires.getSeconds() + 120);
    const token = await this.jwtServive.signAsync(payload);

    response.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    });
  }
}
