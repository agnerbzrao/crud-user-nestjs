import {
  Body,
  Controller,
  Post,
  Get,
  Res,
  HttpStatus,
  Delete,
  Param,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { Public } from '../auth/public-strategy';
import { BaseUser } from 'src/users/dto/base-user.dto';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Public()
  @Post('login')
  async signIn(@Body() signUpDto, @Res() res: Response) {
    const token = await this.authService.signIn(signUpDto);
    return res.status(HttpStatus.OK).json(token);
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
    } catch (error: any) {
      return error.message;
    }
  }

  @Get('get-all-users')
  async getUsers(@Res() res: Response) {
    try {
      return await this.authService.getUsers(res);
    } catch (error: any) {
      return error.message;
    }
  }

  @Delete(':id')
  remove(@Param('id') id: number, @Res() res: Response) {
    return this.authService.deleteUser(+id, res);
  }
}
