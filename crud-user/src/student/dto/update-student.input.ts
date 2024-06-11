import { CreateStudentInput } from './create-student.input';
import { InputType, Field, ID, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateStudentInput extends PartialType(CreateStudentInput) {
  @Field(() => ID)
  id: number;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  email: string;
}
