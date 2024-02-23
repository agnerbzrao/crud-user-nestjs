import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
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
import { diskStorage } from 'multer';
import { Response } from 'express';

const storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, './src/images');
  },
  filename: (req, file, cb) => {
    const fileExt = file?.mimetype?.split('/')[1];
    const fileGen = `${Date.now()}.${fileExt}`;
    cb(null, fileGen);
  },
});

@Controller('costumer')
export class CostumerController {
  constructor(private readonly costumerService: CostumerService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('costumerImage', {
      storage,
    }),
  )
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createCostumerDto: CreateCostumerDto,
  ) {
    console.log(file);

    return this.costumerService.create(file, createCostumerDto);
  }

  @Get()
  findAll(@Res() res: Response) {
    return this.costumerService.findAll(res);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    return this.costumerService.findOne(+id, res);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('costumerImage', {
      storage: storage,
    }),
  )
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
