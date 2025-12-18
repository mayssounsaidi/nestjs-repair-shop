import { IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { DeviceGrade, DeviceStatus } from '../../common/enums';

export class CreateDeviceDto {
  @IsNotEmpty()
  serialNumber!: string;

  @IsNotEmpty()
  brand!: string;

  @IsNotEmpty()
  model!: string;

  @IsOptional()
  @IsEnum(DeviceStatus)
  status?: DeviceStatus; // PENDING par défaut

  @IsOptional()
  @IsEnum(DeviceGrade)
  grade?: DeviceGrade; // NONE par défaut
}
