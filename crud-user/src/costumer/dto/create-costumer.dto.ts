import { IsNotEmpty, MinLength, MaxLength, IsString } from 'class-validator';
export class CreateCostumerDto {
  @IsString()
  @IsNotEmpty({
    message: 'The field costumerName is required',
  })
  @MinLength(10, {
    message: 'The field costumerName is too short',
  })
  @MaxLength(50, {
    message: 'The field costumerName is too long',
  })
  costumerName: string;

  @IsNotEmpty({
    message: 'The field costumerAge is required',
  })
  @MaxLength(2, {
    message: 'The field costumerAge is too long',
  })
  costumerAge: number;
}
