import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { CostumerService } from './costumer.service';
import { CreateCostumerDto } from './dto/create-costumer.dto';
import { UpdateCostumerDto } from './dto/update-costumer.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import multerConfig from '../files/multer-config';
import { getFileValidator } from './dto/parse-file-pipe-document';

@Controller('costumer')
export class CostumerController {
  constructor(private readonly costumerService: CostumerService) {}

  @Get()
  findAll(@Res() res: Response) {
    return this.costumerService.findAll(res);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    return this.costumerService.findOne(+id, res);
  }

  @Post()
  @UseInterceptors(FileInterceptor('costumerImage', multerConfig))
  create(
    @UploadedFile(getFileValidator()) file: Express.Multer.File,
    @Body() createCostumerDto: CreateCostumerDto,
  ) {
    return this.costumerService.create(file, createCostumerDto);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('costumerImage', multerConfig))
  update(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
    @Body() updateCostumerDto: UpdateCostumerDto,
    @Res() res: Response,
  ) {
    return this.costumerService.update(file, +id, updateCostumerDto, res);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    return this.costumerService.delete(+id, res);
  }
}
