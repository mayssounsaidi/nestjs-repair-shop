import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Intervention } from './interventions.entity';
import { InterventionsService } from './interventions.service';
import { InterventionsController } from './interventions.controller';
import { SparePart } from '../parts/spare-part.entity';
import { Device } from '../devices/devices.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Intervention, SparePart, Device]),
  ],
  providers: [InterventionsService],
  controllers: [InterventionsController],
})
export class InterventionsModule {}
