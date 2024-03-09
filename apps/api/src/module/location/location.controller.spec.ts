import { Test, TestingModule } from '@nestjs/testing';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { EventEmitterModule } from '@nestjs/event-emitter';
import HttpMocks from 'node-mocks-http';

import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { HttpModule } from '../http/http.module';
import {
  MockCacheLocationDateTimeData,
  MockHydratedData,
  MockTrafficCamApiData,
} from './__mock__/controller';
import { Cache } from 'cache-manager';
import { PrismaService } from '../persistence/prisma/prisma.service';

describe('LocationController', () => {
  let controller: LocationController;
  let service: LocationService;
  let cache: Cache;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, EventEmitterModule.forRoot()],
      controllers: [LocationController],
      providers: [
        LocationService,
        PrismaService,
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: () => jest.fn(),
            set: () => jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<LocationController>(LocationController);
    service = module.get<LocationService>(LocationService);
    cache = module.get(CACHE_MANAGER);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should use cache', async () => {
    const response = HttpMocks.createResponse();
    jest.spyOn(cache, 'get').mockResolvedValue(MockCacheLocationDateTimeData);

    await controller.getTrafficLocation(
      { dateTime: '2024-02-29T00:00:00' },
      response,
    );

    expect(response._getStatusCode()).toBe(200);
    expect(response._getJSONData()).toStrictEqual({
      dateTime: '2024-02-29T00:00:00',
      locationData: MockCacheLocationDateTimeData,
    });
  });

  it('should use recommend', async () => {
    const response = HttpMocks.createResponse();
    jest.spyOn(cache, 'get').mockResolvedValue(null);
    jest.spyOn(service, 'getTrafficLocation').mockResolvedValue({ items: [] });
    jest.spyOn(service, 'getRecentSearch').mockResolvedValue({
      dateTime: '2024-02-29T00:00:00',
      locationData: MockHydratedData,
    });

    await controller.getTrafficLocation(
      { dateTime: '2023-03-10T00:00:00' },
      response,
    );

    expect(response._getStatusCode()).toBe(202);
    expect(response._getJSONData()).toStrictEqual({
      dateTime: '2024-02-29T00:00:00',
      locationData: MockHydratedData,
    });
  });

  it('should call api ', async () => {
    const response = HttpMocks.createResponse();
    jest
      .spyOn(service, 'getTrafficLocation')
      .mockReturnValue(Promise.resolve(MockTrafficCamApiData));

    jest
      .spyOn(service, 'hydrateTrafficCamLocation')
      .mockResolvedValue(MockHydratedData);

    jest.spyOn(cache, 'get').mockResolvedValue(null);

    await controller.getTrafficLocation(
      { dateTime: '2024-02-29T00:00:00' },
      response,
    );

    expect(service.getTrafficLocation).toHaveBeenCalled();
    expect(service.hydrateTrafficCamLocation).toHaveBeenCalled();
    expect(response._getStatusCode()).toBe(200);
    expect(response._getJSONData()).toStrictEqual({
      dateTime: '2024-02-29T00:00:00',
      locationData: MockHydratedData,
    });
  });
});
