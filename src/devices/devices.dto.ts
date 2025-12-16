import { DeviceGrade } from '../common/enums';

export class CreateDeviceDto {
  serialNumber!: string;
  brand!: string;
  model!: string;
  grade?: DeviceGrade;
}
