export class CreateToyDto {
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
