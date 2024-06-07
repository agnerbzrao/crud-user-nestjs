import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Book as BookEntity } from './entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookEntity) private bookRepo: Repository<BookEntity>,
  ) { }
  async create(createBookInput: CreateBookInput) {
    const { title, description } = createBookInput;
    const check = await this.bookRepo.findOne({
      where: {
        title,
      },
    });
    if (check) throw new BadRequestException('Title already exist!');
    const bookCreated = this.bookRepo.create({ title, description });

    return await this.bookRepo.save(bookCreated);
  }

  findAll() {
    return `This action returns all book`;
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookInput: UpdateBookInput) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
