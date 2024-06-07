import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class BookResponse {
  @Field(() => ID, { description: 'Example field (placeholder)' })
  id: number;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;
}
