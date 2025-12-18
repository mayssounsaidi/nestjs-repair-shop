import { IsOptional, IsEnum } from 'class-validator';
import { DeviceGrade, DeviceStatus } from '../../common/enums';

export class UpdateDeviceDto {
  @IsOptional()
  @IsEnum(DeviceStatus)
  status?: DeviceStatus;

  @IsOptional()
  @IsEnum(DeviceGrade)
  grade?: DeviceGrade;
}
