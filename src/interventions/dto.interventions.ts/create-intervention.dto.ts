import { IsNotEmpty, IsArray, ArrayNotEmpty, IsNumber } from 'class-validator';

export class CreateInterventionDto {
  @IsNotEmpty()
  deviceId!: number; // L'ID du Device concerné

  @IsNotEmpty()
  description!: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  spareParts!: number[]; // IDs des pièces utilisées
}
