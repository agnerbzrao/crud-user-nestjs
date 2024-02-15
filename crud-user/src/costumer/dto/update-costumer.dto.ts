import { PartialType } from '@nestjs/mapped-types';
import { CreateCostumerDto } from './create-costumer.dto';

export class UpdateCostumerDto extends PartialType(CreateCostumerDto) {
  costumerName: string;
  costumerAge: number;
  costumerImage: string;
}
