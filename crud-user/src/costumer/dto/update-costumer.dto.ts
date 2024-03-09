import { PartialType } from '@nestjs/mapped-types';
import { CreateCostumerDto } from './create-costumer.dto';
import { MinLength, MaxLength, IsString } from 'class-validator';

export class UpdateCostumerDto extends PartialType(CreateCostumerDto) {
  @IsString()
  @MinLength(10, {
    message: 'The field costumerName is too short',
  })
  @MaxLength(50, {
    message: 'The field costumerName is too long',
  })
  costumerName: string;

  @MinLength(10, {
    message: 'The field costumerEmail is too short',
  })
  @MaxLength(100, {
    message: 'The field costumerEmail is too long',
  })
  costumerEmail: string;

  costumerImage: string;
}
