import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Response } from 'express';
import * as fs from 'fs/promises';
import * as path from 'path';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(res: Response) {
    const user = await this.userRepository.find();
    if (user.length !== 0) {
      return res.status(200).json(user);
    }
    return res.status(404).json({ msg: 'user not found.' });
  }

  async findOne(id: number, res: Response) {
    const user = await this.userRepository.findOneBy({ id });
    if (user) {
      return res.status(200).json(user);
    }
    return res.status(404).json({ msg: 'user not found.' });
  }

  // Create a new user profile with uploaded image and user data
  create(file: Express.Multer.File, createUserDto: CreateUserDto) {
    // Extract userName and userAge from the DTO
    const { userName, userAge } = createUserDto;

    // Create a new User object with user data and, if provided, the uploaded file's filename
    const user = this.userRepository.create({
      userName: userName,
      userAge: userAge,
      userImage: file?.filename,
    });

    // Save the newly created User to the database and return the saved User
    return this.userRepository.save(user);
  }

  async update(
    file: Express.Multer.File,
    id: number,
    updateUserDto: UpdateUserDto,
    res: Response,
  ) {
    const { userName, userAge } = updateUserDto;
    const user = await this.userRepository.findOneBy({ id });
    if (user) {
      if (file) {
        await fs.unlink(path.join(process.cwd(), `./images/${user.userImage}`));
        await this.userRepository.update(
          {
            id: id,
          },
          {
            userName: userName,
            userAge: userAge,
            userImage: file?.filename,
          },
        );
        return res.status(200).json({ msg: 'user updated successfully.' });
      }

      await this.userRepository.update(
        {
          id: id,
        },
        {
          userName: userName,
          userAge: userAge,
        },
      );
      return res.status(200).json({ msg: 'user updated successfully.' });
    }
    return res.status(404).json({ msg: 'user not found.' });
  }

  async delete(id: number, res: Response) {
    const user = await this.userRepository.findOneBy({ id });
    if (user) {
      await fs.unlink(path.join(process.cwd(), `./images/${user.userImage}`));
      await this.userRepository.delete(id);
      return res.status(200).json({ msg: 'user deleted successfully.' });
    }
    return res.status(404).json({ msg: 'user not found.' });
  }
}
