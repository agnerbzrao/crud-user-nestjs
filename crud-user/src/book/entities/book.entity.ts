import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;
}
