import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Student } from 'src/student/entities/student.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  student_id: number;

  @Field(() => Student)
  @JoinColumn({ name: 'student_id' })
  @ManyToOne(() => Student, (student) => student.books)
  student?: Student
}
