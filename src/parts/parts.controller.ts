import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { PartsService } from './parts.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../users/user.entity';

@Controller('parts')
@UseGuards(JwtAuthGuard)
export class PartsController {
  constructor(private partsService: PartsService) {}

  @Get()
  getAll() {
    return this.partsService.findAll();
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() body: any) {
    return this.partsService.create(body);
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() body: any) {
    return this.partsService.update(id, body);
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.partsService.remove(id);
  }
}
