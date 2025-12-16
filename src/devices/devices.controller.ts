import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { DevicesService } from './devices.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums';
import { CreateDeviceDto } from '../devices/devices.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Post()
  create(@Body() dto: CreateDeviceDto) {
    return this.devicesService.create(dto);
  }

  @Get()
  findAll() {
    return this.devicesService.findAll();
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.devicesService.remove(+id);
  }
}
