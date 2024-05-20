import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { BaseUser } from './dto/base-user.dto';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async findOneBy(email: string): Promise<User | undefined> {
    return await this.userRepository.findOneBy({ userEmail: email });
  }
  async create(createUserDto: BaseUser, res: Response) {
    try {
      if (createUserDto.userPassword !== createUserDto.userConfirmPassword) {
        throw new BadRequestException({
          message: `The passwords didn't match`,
        });
      }
      const saltOrRounds = 10;
      const generatedSalt = await bcrypt.genSalt(saltOrRounds);
      const hashedPassword = await bcrypt.hash(
        createUserDto.userPassword,
        generatedSalt,
      );

      createUserDto.userPassword = hashedPassword;
      delete createUserDto.userConfirmPassword;

      const user = this.userRepository.create(createUserDto);
      await this.userRepository.save(user);

      return res
        .status(201)
        .json({ message: 'User has created successfully.' });
    } catch (error) {
      return error;
    }
  }

  async findAllUsers(res: Response): Promise<Response> {
    const users = await this.userRepository.find();
    if (users.length !== 0) {
      return res.status(200).json(users);
    }
    throw new NotFoundException({
      message: `Anyone customer was found`,
    });
  }

  async deleteUser(id: number, res: Response) {
    try {
      const customer = await this.userRepository.findOneBy({ id });

      if (customer) {
        await this.userRepository.softDelete(id);
        return res.status(200).json({ message: 'User deleted successfully.' });
      }
      throw new NotFoundException({
        message: `User with id ${id} not found`,
      });
    } catch (error) {
      return error?.message;
    }
  }
}
