import { IsFile } from './file-costumer-validation';

export class UpdateCostumerDto {
  costumerName: string;
  costumerAge: number;
  @IsFile({ mime: ['image/jpg', 'image/png'] })
  costumerImage: string;
}
