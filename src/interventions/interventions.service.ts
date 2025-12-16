import {
  Injectable,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Intervention } from './interventions.entity';
import { SparePart } from '../parts/spare-part.entity';
import { Device } from '../devices/devices.entity';
import { CreateInterventionDto } from '../interventions/interventions.dto';
import { DeviceStatus, Role } from '../common/enums';
import { User } from '../users/user.entity';

@Injectable()
export class InterventionsService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Intervention)
    private interventionRepo: Repository<Intervention>,
    @InjectRepository(SparePart)
    private partRepo: Repository<SparePart>,
    @InjectRepository(Device)
    private deviceRepo: Repository<Device>,
  ) {}

  async create(dto: CreateInterventionDto, user: User) {
    if (user.role !== Role.TECH) {
      throw new ForbiddenException('Only technicians can create interventions');
    }

    return this.dataSource.transaction(async manager => {
      const device = await manager.findOne(Device, {
        where: { id: dto.deviceId },
      });
      if (!device) throw new BadRequestException('Device not found');

      const parts = await manager.findByIds(SparePart, dto.sparePartIds);

      for (const part of parts) {
        if (part.stock < 1) {
          throw new BadRequestException(
            `Not enough stock for ${part.name}`,
          );
        }
        part.stock -= 1;
        await manager.save(part);
      }

      device.status = DeviceStatus.REPAIRING;
      await manager.save(device);

      const intervention = manager.create(Intervention, {
        description: dto.description,
        technician: user,
        device,
        spareParts: parts,
      });

      return manager.save(intervention);
    });
  }
}
