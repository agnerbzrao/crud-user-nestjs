import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
import { Response } from 'express';
import { IsNull, Not } from 'typeorm';

import * as fs from 'fs/promises';
import * as path from 'path';
@Injectable()
export class CustomerService {
  private beginOfPathFile: string = './src/images/';
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async findAll(res: Response) {
    const customer = await this.customerRepository.find();
    if (customer.length !== 0) {
      return res.status(200).json(customer);
    }
    throw new NotFoundException({
      message: `Anyone customer was found`,
    });
  }

  async findForAllCustomersEvenDeleted(res: Response) {
    const customer = await this.customerRepository.find({
      where: {
        deletedAt: Not(IsNull()),
      },
      withDeleted: true,
    });
    if (customer.length !== 0) {
      return res.status(200).json(customer);
    }
    throw new NotFoundException({
      message: `Anyone customer was found even deleted`,
    });
  }

  async findOne(id: number, res: Response) {
    const customer = await this.customerRepository.findOneBy({ id });
    if (customer) {
      return res.status(200).json(customer);
    }
    throw new NotFoundException({
      message: `Customer with id ${id} not found`,
    });
  }

  async getCustomerImageBuffer(id: number, res: Response) {
    const customer = await this.customerRepository.findOneBy({ id });
    if (customer) {
      const resultImageBuffer = await fs.readFile(
        this.beginOfPathFile + customer?.customerImage,
      );
      return res.status(200).json(resultImageBuffer);
    }
    throw new NotFoundException({
      message: `Customer image with id ${id} not found`,
    });
  }

  create(file: Express.Multer.File, createCustomerDto: CreateCustomerDto) {
    const { customerName, customerEmail, status } = createCustomerDto;

    const customer = this.customerRepository.create({
      customerName: customerName,
      customerEmail: customerEmail,
      customerImage: file?.filename,
      status: status,
    });

    return this.customerRepository.save(customer);
  }

  async update(
    file: Express.Multer.File,
    id: number,
    updateCustomerDto: UpdateCustomerDto,
    res: Response,
  ) {
    const customer = await this.customerRepository.findOneBy({ id });
    if (!customer) {
      await this.deleteFile(file?.filename, file);
      throw new NotFoundException({
        message: `Customer with id ${id} not found`,
      });
    }

    updateCustomerDto.customerImage = file?.filename;
    await this.customerRepository.update({ id }, updateCustomerDto);
    await this.deleteFile(customer.customerImage, file);

    return res.status(200).json({ msg: 'Customer updated successfully.' });
  }

  async deleteFile(pathFile: string, file: Express.Multer.File): Promise<void> {
    if (file) {
      await fs.unlink(
        path.join(process.cwd(), this.beginOfPathFile + pathFile),
      );
    }
  }

  async delete(id: number, res: Response) {
    const customer = await this.customerRepository.findOneBy({ id });

    if (customer) {
      await fs.unlink(
        path.join(process.cwd(), this.beginOfPathFile + customer.customerImage),
      );

      await this.customerRepository.softDelete(id);
      return res
        .status(200)
        .json({ message: 'Customer deleted successfully.' });
    }
    throw new NotFoundException({
      message: `Customer with id ${id} not found`,
    });
  }
}
