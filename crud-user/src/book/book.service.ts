import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Book as BookEntity } from './entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookEntity)
    private bookRepository: Repository<BookEntity>,
  ) { }
  async create(createBookInput: CreateBookInput) {
    try {
      const { title } = createBookInput;
      const check = await this.bookRepository.findOne({
        where: {
          title,
        },
      });

      if (check) throw new BadRequestException('Title already exist!');

      const bookCreated = this.bookRepository.create({ ...createBookInput } as any)

      return await this.bookRepository.save(bookCreated);
    } catch (error: any) {
      return error.message;
    }
  }

  async findAll() {
    try {
      const books = await this.bookRepository.find();
      if (books.length !== 0) {
        return books;
      }

      throw new NotFoundException({
        message: `Anyone book was found`,
      });
    } catch (error: any) {
      return error.message;
    }
  }

  async findOne(id: number) {
    try {
      return await this.bookRepository.findOneBy({ id });
    } catch (error: any) {
      return error.message;
    }
  }

  async update(id: number, updateBookInput: UpdateBookInput) {
    try {
      const book = await this.bookRepository.findOneBy({ id });
      if (!book) {
        throw new NotFoundException({
          message: `Book with id ${id} not found`,
        });
      }

      await this.bookRepository.update({ id }, updateBookInput as any);
      return updateBookInput;
    } catch (error: any) {
      return error.message;
    }
  }

  async findMany(id: number): Promise<BookEntity[]> {
    try {
      return await this.bookRepository.createQueryBuilder("book")
        .where("book.student_id = :id", { id })
        .getMany();
    } catch (error: any) {
      return error.message;
    }
  }

  async remove(id: number) {
    try {
      const book = await this.bookRepository.findOneBy({ id });

      if (!book) {
        throw new NotFoundException({
          message: `Book with id ${id} not found`,
        });
      }
      await this.bookRepository.delete(id);
      return book;
    } catch (error: any) {
      return error.message;
    }

  }
}
