import { Resolver, Query, Mutation, Args, ID, ResolveField, Parent } from '@nestjs/graphql';
import { BookService } from './book.service';
import { Book as BookEntity } from './entities/book.entity';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { Public } from '../auth/public-strategy';
import { Student } from 'src/student/entities/student.entity';
import { StudentService } from 'src/student/student.service';
@Public()
@Resolver(() => BookEntity)
export class BookResolver {
  constructor(private readonly bookService: BookService, private studentService: StudentService) { }

  @Mutation(() => BookEntity)
  createBook(
    @Args('createBookInput') createBookInput: CreateBookInput,
  ): Promise<BookEntity[]> {
    return this.bookService.create(createBookInput);
  }

  @Query(() => [BookEntity])
  findAllBooks() {
    return this.bookService.findAll();
  }

  @Query(() => BookEntity)
  findOneBook(@Args('id', { type: () => ID }) id: number) {
    return this.bookService.findOne(id);
  }

  @Mutation(() => BookEntity)
  updateBook(@Args('updateBookInput') updateBookInput: UpdateBookInput) {
    return this.bookService.update(updateBookInput.id, updateBookInput);
  }

  @Mutation(() => BookEntity)
  removeBook(@Args('id', { type: () => ID }) id: number) {
    return this.bookService.remove(id);
  }

  @ResolveField(() => Student)
  async getStudent(@Parent() book: BookEntity): Promise<Student> {
    return await this.studentService.findOne(book.student_id);
  }
}
