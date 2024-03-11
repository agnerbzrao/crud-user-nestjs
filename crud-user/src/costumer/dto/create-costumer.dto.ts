import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsString,
  Matches,
  IsEnum,
  NotEquals,
} from 'class-validator';
import { Status } from '../enum/status.enum';
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
    message: 'The field costumerEmail is required',
  })
  @MinLength(10, {
    message: 'The field costumerEmail is too short',
  })
  @MaxLength(100, {
    message: 'The field costumerEmail is too long',
  })
  @Matches(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/, {
    message: 'The e-mail must have @ and .com',
  })
  costumerEmail: string;

  @IsEnum(Status, {
    message: 'The field status is required',
  })
  @NotEquals(Status)
  status: Status;
}
