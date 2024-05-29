import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class Book {
  @Field(type => ID)
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;
}