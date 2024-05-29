import { Query, Resolver } from '@nestjs/graphql';
import { Book } from './book';

@Resolver(of => Book)
export class BookResolver {
  @Query(returns => [Book])
  async recipes(): Promise<Book[]> {
    return [
      {
        id: '1',
        title: 'First Book',
        description: 'The first Book',
      },
    ];
  }
}
