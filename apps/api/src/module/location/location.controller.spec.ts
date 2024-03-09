import { Test, TestingModule } from '@nestjs/testing';
import { LocationController } from './location.controller';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { LocationService } from './location.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { HttpModule } from '../http/http.module';
import {
  MockCacheLocationDateTimeData,
  MockHydratedData,
  MockTrafficCamApiData,
} from './__mock__/controller';
import { Response } from 'express';
import { Cache } from 'cache-manager';

describe('LocationController', () => {
  let controller: LocationController;
  let service: LocationService;
  let cache: Cache;

  const mockResponse = () => {
    const res = {} as unknown as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };
  const response = mockResponse();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, EventEmitterModule.forRoot()],
      controllers: [LocationController],
      providers: [
        LocationService,
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: () => {},
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
    jest
      .spyOn(cache, 'get')
      .mockResolvedValueOnce(MockCacheLocationDateTimeData);
    const resp = await controller.getTrafficLocation(
      { dateTime: '2024-02-29T00:00:00' },
      response,
    );

    expect(resp.status).toHaveBeenCalledWith(200);
    expect(resp.json).toHaveBeenCalledWith(MockCacheLocationDateTimeData);
  });

  it('should call api ', async () => {
    jest
      .spyOn(service, 'getTrafficLocation')
      .mockResolvedValue(MockTrafficCamApiData);
    jest
      .spyOn(service, 'hydrateTrafficCamLocation')
      .mockResolvedValue(MockHydratedData);

    await controller.getTrafficLocation(
      { dateTime: '2024-01-02T00:00:00' },
      response,
    );

    expect(service.getTrafficLocation).toHaveBeenCalled();
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith(MockHydratedData);
  });
});
