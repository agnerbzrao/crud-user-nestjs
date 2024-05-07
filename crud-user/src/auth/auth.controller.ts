import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';

import { Public } from '../auth/public-strategy';
import { BaseUser } from 'src/users/dto/base-user.dto';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Public()
  @Post('signup')
  signUp(@Body() signUpDto: BaseUser, res: Response) {
    const payload = {
      userName: signUpDto.userName,
      userEmail: signUpDto.userEmail,
      userPassword: signUpDto.userPassword,
      userConfirmPassword: signUpDto.userConfirmPassword,
      createdAt: new Date(),
    };
    try {
      return this.authService.signUp(payload, res);
    } catch (error) {
      return error.message;
    }
  }
}
