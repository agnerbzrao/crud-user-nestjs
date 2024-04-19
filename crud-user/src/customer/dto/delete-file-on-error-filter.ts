import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as fs from 'fs';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const file: Express.Multer.File = request?.file;
    if (request?.file) {
      fs.unlink(file.path, (err) => {
        if (err) {
          console.error(err);
          return err;
        }
      });
    }
    return response.status(status).json(exception.getResponse());
  }
}
