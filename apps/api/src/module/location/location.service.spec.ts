import { Test, TestingModule } from '@nestjs/testing';
import { LocationService } from './location.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { HttpModule } from '../http/http.module';

describe('LocationService', () => {
  let service: LocationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, EventEmitterModule.forRoot()],
      providers: [LocationService, { provide: CACHE_MANAGER, useValue: {} }],
    }).compile();

    service = module.get<LocationService>(LocationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
