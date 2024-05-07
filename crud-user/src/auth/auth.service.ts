import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { BaseUser } from 'src/users/dto/base-user.dto';
import { Response } from 'express';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async signIn(email, pass) {
    const user = await this.usersService.findOneBy(email);
    if (user?.userPassword !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, email: user.userEmail };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async signUp(payload: BaseUser, res: Response) {
    console.log(payload);

    const user = await this.usersService.create(payload, res);
    return user;
  }
}
