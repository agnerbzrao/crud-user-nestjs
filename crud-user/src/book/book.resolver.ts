import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { BookService } from './book.service';
import { Book as BookEntity } from './entities/book.entity';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { Public } from '../auth/public-strategy';
@Public()
@Resolver(() => BookEntity)
export class BookResolver {
  constructor(private readonly bookService: BookService) { }

  @Mutation(() => BookEntity)
  createBook(
    @Args('createBookInput') createBookInput: CreateBookInput,
  ): Promise<BookEntity> {
    try {
      return this.bookService.create(createBookInput);
    } catch (error: any) {
      return error.message;
    }
  }

  @Query(() => [BookEntity])
  findAll() {
    return this.bookService.findAll();
  }

  @Query(() => BookEntity)
  findOne(@Args('id', { type: () => ID }) id: number) {
    return this.bookService.findOne(id);
  }

  @Mutation(() => BookEntity)
  updateBook(@Args('updateBookInput') updateBookInput: UpdateBookInput) {
    return this.bookService.update(updateBookInput.id, updateBookInput);
  }

  @Mutation(() => BookEntity)
  removeBook(@Args('id', { type: () => Int }) id: number) {
    return this.bookService.remove(id);
  }
}
