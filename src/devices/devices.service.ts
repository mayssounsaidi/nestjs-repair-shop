import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device } from './devices.entity';
import { CreateDeviceDto } from '../devices/devices.dto';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Device)
    private deviceRepo: Repository<Device>,
  ) {}

  create(dto: CreateDeviceDto) {
    const device = this.deviceRepo.create(dto);
    return this.deviceRepo.save(device);
  }

  findAll() {
    return this.deviceRepo.find();
  }

  async remove(id: number) {
    const device = await this.deviceRepo.findOneBy({ id });
    if (!device) throw new NotFoundException('Device not found');
    return this.deviceRepo.remove(device);
  }
}
