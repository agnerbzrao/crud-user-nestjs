import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Book } from 'src/book/entities/book.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@ObjectType()
@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  email: string;

  @Field(() => [Book], { nullable: true })
  @OneToMany(() => Book, (book) => book.student)
  books: Student[]
}
