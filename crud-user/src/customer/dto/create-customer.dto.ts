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
export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty({
    message: 'The field customerName is required',
  })
  @MinLength(10, {
    message: 'The field customerName is too short',
  })
  @MaxLength(50, {
    message: 'The field customerName is too long',
  })
  customerName: string;

  @IsNotEmpty({
    message: 'The field customerEmail is required',
  })
  @MinLength(10, {
    message: 'The field customerEmail is too short',
  })
  @MaxLength(100, {
    message: 'The field customerEmail is too long',
  })
  @Matches(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/, {
    message: 'The e-mail must have @ and .com',
  })
  customerEmail: string;

  @IsEnum(Status, {
    message: 'The field status is required',
  })
  @NotEquals(Status)
  status: Status;
}
