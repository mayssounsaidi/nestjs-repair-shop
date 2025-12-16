import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: { getStatus: () => 'Repair & Reconditioning API is running' },
        },
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
  });

   describe('root', () => {
    it('should return "Repair & Reconditioning API is running"', () => {
      expect(appController.getStatus()).toBe('Repair & Reconditioning API is running');
    });
  });
});