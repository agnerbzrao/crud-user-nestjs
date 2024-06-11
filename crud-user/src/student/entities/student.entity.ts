import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Book } from 'src/book/entities/book.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';

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

  @OneToMany(() => Book, (book) => book.studentId)
  @Field(() => Book)
  @JoinColumn({ name: "studentId" })
  books: Student[]
}
