import { IsOptional, IsNumber, Min } from 'class-validator';

export class UpdatePartDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  stock?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;
}
