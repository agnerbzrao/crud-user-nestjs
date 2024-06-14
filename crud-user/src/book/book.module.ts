import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookResolver } from './book.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Student } from 'src/student/entities/student.entity';
import { StudentService } from 'src/student/student.service';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Student])],
  providers: [BookResolver, BookService, StudentService],
})
export class BookModule { }
