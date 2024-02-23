import { IsNotEmpty, MinLength, MaxLength, IsString } from 'class-validator';
import { IsFile } from './file-costumer-validation';
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
  costumerAge: number;

  @IsFile({ mime: ['image/jpg', 'image/png'] })
  costumerImage: File;
}
