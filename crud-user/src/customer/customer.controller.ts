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
  UseFilters,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import multerConfig from '../files/multer-config';
import { getFileValidator } from './dto/parse-file-pipe-document';
import { HttpExceptionFilter } from './dto/delete-file-on-error-filter';

@UseFilters(HttpExceptionFilter)
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  findAll(@Res() res: Response) {
    return this.customerService.findAll(res);
  }

  @Get('/all-customers')
  findForAllCustomersEvenDeleted(@Res() res: Response) {
    return this.customerService.findForAllCustomersEvenDeleted(res);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    return this.customerService.findOne(+id, res);
  }

  @Get('customer-image-buffer/:id')
  getCustomerImageBuffer(@Param('id') id: string, @Res() res: Response) {
    return this.customerService.getCustomerImageBuffer(+id, res);
  }

  @Post()
  @UseInterceptors(FileInterceptor('customerImage', multerConfig))
  create(
    @UploadedFile(getFileValidator()) file: Express.Multer.File,
    @Body() createCustomerDto: CreateCustomerDto,
  ) {
    return this.customerService.create(file, createCustomerDto);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('customerImage', multerConfig))
  update(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
    @Res() res: Response,
  ) {
    return this.customerService.update(file, +id, updateCustomerDto, res);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    return this.customerService.delete(+id, res);
  }
}
