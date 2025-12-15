import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SparePart } from './spare-parts.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PartsService {
  constructor(@InjectRepository(SparePart) private repo: Repository<SparePart>) {}

  findAll() {
    return this.repo.find();
  }

  create(data: Partial<SparePart>) {
    const part = this.repo.create(data);
    return this.repo.save(part);
  }

  async update(id: number, data: Partial<SparePart>) {
    const part = await this.repo.findOne({ where: { id } });
    if (!part) throw new NotFoundException('Spare part not found');
    Object.assign(part, data);
    return this.repo.save(part);
  }

  async remove(id: number) {
    const part = await this.repo.findOne({ where: { id } });
    if (!part) throw new NotFoundException('Spare part not found');
    return this.repo.remove(part);
  }
}
