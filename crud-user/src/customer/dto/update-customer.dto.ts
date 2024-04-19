import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerDto } from './create-customer.dto';
import { MinLength, MaxLength, IsString, Matches } from 'class-validator';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {
  @IsString()
  @MinLength(10, {
    message: 'The field customerName is too short',
  })
  @MaxLength(50, {
    message: 'The field customerName is too long',
  })
  customerName: string;

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

  customerImage: string;
}
