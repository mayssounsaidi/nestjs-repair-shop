import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { InterventionsService } from './interventions.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { CreateInterventionDto } from '../interventions/interventions.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('interventions')
export class InterventionsController {
  constructor(private readonly service: InterventionsService) {}

  @Post()
  create(@Body() dto: CreateInterventionDto, @Req() req) {
    return this.service.create(dto, req.user);
  }
}
