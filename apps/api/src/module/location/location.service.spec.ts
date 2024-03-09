import { Test, TestingModule } from '@nestjs/testing';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { HttpService } from '@nestjs/axios';

import { LocationService } from './location.service';
import {
  MockBatchReverseGeocodingJobApiData,
  MockCacheLocationList,
  MockGetReverseGeocodingParams,
  MockHydratedCamLocationData,
  MockHydratedTrafficCamData,
  MockReverseGeocodingPendingApiData,
  MockFullCacheTrafficCamApiData,
  MockPartialCacheTrafficCamApiData,
  MockPartialCacheHydratedCamLocationData,
} from './__mock__/service';
import { UpdateLocationCacheEvent } from './events/update-location-cache.event';
import { of } from 'rxjs';
import { get } from 'radash';
import { TrafficCameraData } from './type/traffic-api.type';

describe('LocationService', () => {
  let service: LocationService;
  let eventEmitter: EventEmitter2;
  let httpService: HttpService;

  const httpService2 = {
    get: jest.fn(),
    post: jest.fn().mockImplementation(() => of({ data: {} })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        {
          provide: EventEmitter2,
          useValue: {
            emit: jest.fn(),
          },
        },
        LocationService,
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: () => MockCacheLocationList,
            set: () => jest.fn(),
          },
        },
        {
          provide: HttpService,
          useValue: httpService2,
        },
      ],
    }).compile();

    service = module.get<LocationService>(LocationService);
    eventEmitter = module.get<EventEmitter2>(EventEmitter2);
    httpService = module.get<HttpService>(HttpService);
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

  describe('Test Location Service - storeLocationCache', () => {
    it('Trigger api - success', async () => {
      jest
        .spyOn<any, any>(httpService, 'get')
        .mockReturnValueOnce(of({ data: MockReverseGeocodingPendingApiData }));

      const resp = await service.getReverseGeoPendingJob('testing');

      expect(resp).toBe(MockReverseGeocodingPendingApiData);
    });

    // it('Trigger api until max attempt', async () => {
    //   jest
    //     .spyOn<any, any>(httpService, 'get')
    //     .mockImplementation(() => retry({ count: 1 }));

    //   const resp = await service.getReverseGeoPendingJob('testing');

    //   expect(resp).toEqual([]);
    // });
  });

  describe('Test Location Service - getReverseGeocoding', () => {
    it('Trigger Api', async () => {
      jest
        .spyOn<any, any>(httpService, 'post')
        .mockReturnValueOnce(of({ data: MockBatchReverseGeocodingJobApiData }));

      const resp = await service.getReverseGeocoding(
        MockGetReverseGeocodingParams,
      );

      expect(resp).toBe(MockBatchReverseGeocodingJobApiData);
    });
  });

  describe('Test Location Service - getTrafficLocation', () => {
    it('Trigger Api', async () => {
      jest
        .spyOn<any, any>(httpService, 'get')
        .mockReturnValueOnce(of({ data: MockFullCacheTrafficCamApiData }));

      const resp = await service.getTrafficLocation('2024-02-29T00:00:00');

      expect(resp).toBe(MockFullCacheTrafficCamApiData);
    });
  });

  describe('Test Location Service - hydrateTrafficCamLocation', () => {
    it('With full cache data', async () => {
      const cameraData = get<TrafficCameraData[]>(
        MockFullCacheTrafficCamApiData,
        'items.0.cameras',
        [],
      );
      const resp = await service.hydrateTrafficCamLocation(cameraData);

      expect(resp).toStrictEqual(MockHydratedCamLocationData);
    });

    it('With partially cache data', async () => {
      jest
        .spyOn(service, 'getReverseGeocoding')
        .mockResolvedValue({ id: '', status: '', url: '' });

      jest.spyOn(service, 'getReverseGeoPendingJob').mockResolvedValue([
        {
          query: { lon: 103.51397086, lat: 1.513 },
          lon: 103.51397086,
          lat: 1.513,
          formatted: 'Location_6',
        },
      ]);

      const cameraData = get<TrafficCameraData[]>(
        MockPartialCacheTrafficCamApiData,
        'items.0.cameras',
        [],
      );
      const resp = await service.hydrateTrafficCamLocation(cameraData);

      expect(resp).toStrictEqual(MockPartialCacheHydratedCamLocationData);
      expect(eventEmitter.emit).toHaveBeenCalledTimes(1);
    });
  });
});
