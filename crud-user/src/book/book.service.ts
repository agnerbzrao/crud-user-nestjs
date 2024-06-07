import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Book as BookEntity } from './entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookEntity) private bookRepository: Repository<BookEntity>,
  ) { }
  async create(createBookInput: CreateBookInput) {
    const { title, description } = createBookInput;
    const check = await this.bookRepository.findOne({
      where: {
        title,
      },
    });
    if (check) throw new BadRequestException('Title already exist!');
    const bookCreated = this.bookRepository.create({ title, description });

    return await this.bookRepository.save(bookCreated);
  }

  async findAll() {
    const books = await this.bookRepository.find();
    if (books.length !== 0) {
      return books;
    }
    throw new NotFoundException({
      message: `Anyone book was found`,
    });
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
