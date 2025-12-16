import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getStatus(): string {
    return 'Repair & Reconditioning API is running';
  }
}
