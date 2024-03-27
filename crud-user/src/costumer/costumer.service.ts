import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCostumerDto } from './dto/create-costumer.dto';
import { UpdateCostumerDto } from './dto/update-costumer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Costumer } from './entities/costumer.entity';
import { Repository } from 'typeorm';
import { Response } from 'express';
import { IsNull, Not } from 'typeorm';

import * as fs from 'fs/promises';
import * as path from 'path';
@Injectable()
export class CostumerService {
  private beginOfPathFile: string = './src/images/';
  constructor(
    @InjectRepository(Costumer)
    private costumerRepository: Repository<Costumer>,
  ) {}

  async findAll(res: Response) {
    const costumer = await this.costumerRepository.find();
    if (costumer.length !== 0) {
      return res.status(200).json(costumer);
    }
    throw new NotFoundException({
      message: `Anyone costumer was found`,
    });
  }

  async findForAllCostumersEvenDeleted(res: Response) {
    const costumer = await this.costumerRepository.find({
      where: {
        deletedAt: Not(IsNull()),
      },
      withDeleted: true,
    });
    if (costumer.length !== 0) {
      return res.status(200).json(costumer);
    }
    throw new NotFoundException({
      message: `Anyone costumer was found even deleted`,
    });
  }

  async findOne(id: number, res: Response) {
    const costumer = await this.costumerRepository.findOneBy({ id });
    if (costumer) {
      return res.status(200).json(costumer);
    }
    throw new NotFoundException({
      message: `Costumer with id ${id} not found`,
    });
  }
  async getCostumerImageBuffer(id: number, res: Response) {
    const costumer = await this.costumerRepository.findOneBy({ id });
    if (costumer) {
      const teste = await fs.readFile(
        this.beginOfPathFile + costumer?.costumerImage,
      );
      return res.status(200).json(teste);
    }
    throw new NotFoundException({
      message: `Costumer with id ${id} not found`,
    });
  }

  create(file: Express.Multer.File, createCostumerDto: CreateCostumerDto) {
    const { costumerName, costumerEmail, status } = createCostumerDto;

    const costumer = this.costumerRepository.create({
      costumerName: costumerName,
      costumerEmail: costumerEmail,
      costumerImage: file?.filename,
      status: status,
    });

    return this.costumerRepository.save(costumer);
  }

  async update(
    file: Express.Multer.File,
    id: number,
    updateCostumerDto: UpdateCostumerDto,
    res: Response,
  ) {
    const costumer = await this.costumerRepository.findOneBy({ id });
    if (!costumer) {
      await this.deleteFile(file?.filename, file);
      throw new NotFoundException({
        message: `Costumer with id ${id} not found`,
      });
    }

    updateCostumerDto.costumerImage = file?.filename;
    await this.costumerRepository.update({ id }, updateCostumerDto);
    await this.deleteFile(costumer.costumerImage, file);

    return res.status(200).json({ msg: 'Costumer updated successfully.' });
  }

  async deleteFile(pathFile: string, file: Express.Multer.File): Promise<void> {
    if (file) {
      await fs.unlink(
        path.join(process.cwd(), this.beginOfPathFile + pathFile),
      );
    }
  }
  async delete(id: number, res: Response) {
    const costumer = await this.costumerRepository.findOneBy({ id });

    if (costumer) {
      await this.costumerRepository.softDelete(id);
      return res.status(200).json({ msg: 'Costumer deleted successfully.' });
    }
    throw new NotFoundException({
      message: `Costumer with id ${id} not found`,
    });
  }
}
