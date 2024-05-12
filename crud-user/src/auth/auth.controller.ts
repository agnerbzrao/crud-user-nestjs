import { Body, Controller, Post, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { Public } from '../auth/public-strategy';
import { BaseUser } from 'src/users/dto/base-user.dto';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  signIn(@Body() signUpDto) {
    return this.authService.signIn(signUpDto);
  }

  @Public()
  @Post('signup')
  async signUp(@Body() signUpDto: BaseUser, @Res() res: Response) {
    try {
      const payload = {
        userName: signUpDto.userName,
        userEmail: signUpDto.userEmail,
        userPassword: signUpDto.userPassword,
        userConfirmPassword: signUpDto.userConfirmPassword,
        createdAt: new Date(),
      };
      const result = await this.authService.signUp(payload, res);

      return res.status(result.status).json(result.response);
    } catch (error) {
      return error.message;
    }
  }

  @Public()
  @Get('get-all-users')
  async getUsers(@Res() res: Response) {
    try {
      return await this.authService.getUsers(res);
    } catch (error) {
      return error.message;
    }
  }
}
