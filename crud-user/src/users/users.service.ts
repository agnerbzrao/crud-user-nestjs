import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { BaseUser } from './dto/base-user.dto';
import { Response } from 'express';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async findOneBy(email: string): Promise<UserEntity | undefined> {
    return await this.userRepository.findOneBy({ userEmail: email });
  }
  async create(createUserDto: BaseUser, res: Response) {
    try {
      console.log(createUserDto.userPassword);
      if (createUserDto.userPassword !== createUserDto.userConfirmPassword) {
        throw new BadRequestException({
          message: `The passwords didn't match`,
        });
      }
      return res.status(200).json({ msg: 'User has created successfully.' });
    } catch (error) {
      return error.message;
    }

    // return await this.userRepository.save(createUserDto);
  }
}