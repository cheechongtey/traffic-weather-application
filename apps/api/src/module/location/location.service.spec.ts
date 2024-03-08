import { Test, TestingModule } from '@nestjs/testing';
import { LocationService } from './location.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { HttpModule } from '../http/http.module';
import { MockHydratedTrafficCamData } from './__mock__/service';
import { UpdateLocationCacheEvent } from './events/update-location-cache.event';

describe('LocationService', () => {
  let service: LocationService;
  let eventEmitter: EventEmitter2;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        {
          provide: EventEmitter2,
          useValue: {
            emit: jest.fn(),
          },
        },
        LocationService,
        { provide: CACHE_MANAGER, useValue: {} },
      ],
    }).compile();

    service = module.get<LocationService>(LocationService);
    eventEmitter = module.get<EventEmitter2>(EventEmitter2);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be defined', () => {
    expect(eventEmitter).toBeDefined();
  });

  it('Testing Location Service - storeLocationCache', async () => {
    const eventArr = [];

    for (const item of MockHydratedTrafficCamData) {
      const event = new UpdateLocationCacheEvent();
      event.uniqueKey = `${item.location.latitude}_${item.location.longitude}`;
      event.lat = item.location.latitude;
      event.long = item.location.longitude;
      event.name = item.location_name;

      eventArr.push(event);
    }

    await service.storeLocationCache(MockHydratedTrafficCamData);

    expect(eventEmitter.emit).toHaveBeenCalledTimes(1);
    expect(eventEmitter.emit).toHaveBeenCalledWith(
      'location-cache.update',
      eventArr,
    );
  });
});
