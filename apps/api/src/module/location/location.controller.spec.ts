import { Test, TestingModule } from '@nestjs/testing';
import { LocationController } from './location.controller';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { LocationService } from './location.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { HttpModule } from '../http/http.module';

describe('LocationController', () => {
  let controller: LocationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, EventEmitterModule.forRoot()],
      controllers: [LocationController],
      providers: [LocationService, { provide: CACHE_MANAGER, useValue: {} }],
    }).compile();

    controller = module.get<LocationController>(LocationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
