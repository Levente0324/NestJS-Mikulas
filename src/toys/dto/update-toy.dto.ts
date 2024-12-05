import { PartialType } from '@nestjs/mapped-types';
import { CreateToyDto } from './create-toy.dto';

export class UpdateToyDto extends PartialType(CreateToyDto) {
  id: number;
  name: string;
  material: Material;
  weight: number;
}

export enum Material {
  wood = 'wood',
  metal = 'metal',
  plastic = 'plastic',
  other = 'other',
}
