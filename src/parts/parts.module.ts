import { Module } from '@nestjs/common';
import { PartsService } from './parts.service';
import { PartsController } from './parts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SparePart } from './spare-part.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SparePart])],
  providers: [PartsService],
  controllers: [PartsController],
})
export class PartsModule {}
