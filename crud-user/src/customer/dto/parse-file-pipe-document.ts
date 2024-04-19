import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

export function getFileValidator(): PipeTransform {
  return new ParseFilePipeDocument();
}

@Injectable()
export class ParseFilePipeDocument implements PipeTransform {
  transform(value: Express.Multer.File): Express.Multer.File {
    if (!value) {
      throw new BadRequestException(`customerImage field is required`);
    }
    return value;
  }
}
