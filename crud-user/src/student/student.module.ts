import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentResolver } from './student.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { BookModule } from 'src/book/book.module';
import { BookService } from 'src/book/book.service';
import { Book } from 'src/book/entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student, Book]), BookModule],
  providers: [StudentResolver, StudentService, BookService],
})
export class StudentModule { }
