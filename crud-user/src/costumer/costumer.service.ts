import { Injectable } from '@nestjs/common';
import { CreateCostumerDto } from './dto/create-costumer.dto';
import { UpdateCostumerDto } from './dto/update-costumer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Costumer } from './entities/costumer.entity';
import { Repository } from 'typeorm';
import { Response } from 'express';
import * as fs from 'fs/promises';
import * as path from 'path';
@Injectable()
export class CostumerService {
  constructor(
    @InjectRepository(Costumer)
    private costumerRepository: Repository<Costumer>,
  ) {}

  async findAll(res: Response) {
    const costumer = await this.costumerRepository.find();
    if (costumer.length !== 0) {
      return res.status(200).json(Costumer);
    }
    return res.status(404).json({ msg: 'Costumer not found.' });
  }

  async findOne(id: number, res: Response) {
    const costumer = await this.costumerRepository.findOneBy({ id });
    if (costumer) {
      return res.status(200).json(costumer);
    }
    return res.status(404).json({ msg: 'Costumer not found.' });
  }

  create(file: Express.Multer.File, createCostumerDto: CreateCostumerDto) {
    const { costumerName, costumerAge } = createCostumerDto;

    const costumer = this.costumerRepository.create({
      costumerName: costumerName,
      costumerAge: costumerAge,
      costumerImage: file?.filename,
    });

    return this.costumerRepository.save(costumer);
  }

  async update(
    file: Express.Multer.File,
    id: number,
    updateCostumerDto: UpdateCostumerDto,
    res: Response,
  ) {
    const { costumerName, costumerAge } = updateCostumerDto;
    const costumer = await this.costumerRepository.findOneBy({ id });
    if (costumer) {
      if (file) {
        await fs.unlink(
          path.join(process.cwd(), `./images/${costumer.costumerImage}`),
        );
        await this.costumerRepository.update(
          {
            id: id,
          },
          {
            costumerName: costumerName,
            costumerAge: costumerAge,
            costumerImage: file?.filename,
          },
        );
        return res.status(200).json({ msg: 'Costumer updated successfully.' });
      }

      await this.costumerRepository.update(
        {
          id: id,
        },
        {
          costumerName: costumerName,
          costumerAge: costumerAge,
        },
      );
      return res.status(200).json({ msg: 'Costumer updated successfully.' });
    }
    return res.status(404).json({ msg: 'Costumer not found.' });
  }

  async delete(id: number, res: Response) {
    const costumer = await this.costumerRepository.findOneBy({ id });
    if (costumer) {
      await fs.unlink(
        path.join(process.cwd(), `./images/${costumer.costumerImage}`),
      );
      await this.costumerRepository.delete(id);
      return res.status(200).json({ msg: 'Costumer deleted successfully.' });
    }
    return res.status(404).json({ msg: 'Costumer not found.' });
  }
}
