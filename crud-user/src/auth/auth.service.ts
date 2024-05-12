import {
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { BaseUser } from 'src/users/dto/base-user.dto';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async signIn(user: any) {
    try {
      const userValidation = await this.validateUser(
        user.userEmail,
        user.userPassword,
      );
      if (!userValidation) {
        throw new UnauthorizedException();
      }
      const payload = { username: user.username, sub: user._id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      return error.message;
    }
  }

  async signUp(payload: BaseUser, res: Response) {
    try {
      return await this.usersService.create(payload, res);
    } catch (error) {
      return error.message;
    }
  }

  async validateUser(userEmail: string, password: string): Promise<any> {
    console.log('user');
    const user = await this.usersService.findOneBy(userEmail);

    if (!user) return null;

    const passwordValid = await bcrypt.compare(password, user.userPassword);
    if (!user) {
      throw new NotAcceptableException('Could not find the user');
    }
    if (user && passwordValid) {
      return user;
    }
    return null;
  }

  async getUsers(res: Response) {
    await this.usersService.findAllUsers(res);
  }
}
