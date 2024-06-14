import { Resolver, Query, Mutation, Args, ID, ResolveField, Parent } from '@nestjs/graphql';
import { StudentService } from './student.service';
import { Student } from './entities/student.entity';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';
import { Public } from '../auth/public-strategy';
import { Book } from 'src/book/entities/book.entity';
import { BookService } from 'src/book/book.service';

@Public()
@Resolver(() => Student)
export class StudentResolver {
  constructor(private readonly studentService: StudentService, private bookService: BookService) { }

  @Mutation(() => Student)
  createStudent(@Args('createStudentInput') createStudentInput: CreateStudentInput) {
    return this.studentService.create(createStudentInput);
  }

  @Query(() => [Student])
  findAllStudents() {
    return this.studentService.findAll();
  }

  @Query(() => Student)
  findOneStudent(@Args('id', { type: () => ID }) id: number) {
    return this.studentService.findOne(id);
  }

  @Mutation(() => Student)
  updateStudent(@Args('updateStudentInput') updateStudentInput: UpdateStudentInput) {
    return this.studentService.update(updateStudentInput.id, updateStudentInput);
  }

  @Mutation(() => Student)
  removeStudent(@Args('id', { type: () => ID }) id: number) {
    return this.studentService.remove(id);
  }
  @ResolveField(() => [Book])
  async getBook(@Parent() book: Book): Promise<Book[]> {
    return await this.bookService.findMany(book.id);
  }
}
