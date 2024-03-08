import { Test, TestingModule } from '@nestjs/testing';
import { WeatherService } from './weather.service';
import { HttpModule } from '../http/http.module';
import { PrismaService } from '../persistence/prisma/prisma.service';
import {
  apiDateTime,
  apiLocation,
  fullApiMockFeb29,
  getWeatherForecastResponse,
  weatherApiMockData,
} from './__mock__/service';

describe('WeatherService', () => {
  let service: WeatherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [WeatherService, PrismaService],
    }).compile();

    // prisma = module.get<PrismaService>(PrismaService);
    service = module.get<WeatherService>(WeatherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getWeatherForecast', () => {
    it('Integration test for weather service', async () => {
      jest
        .spyOn(service, 'fetchWeatherForecastApi')
        .mockImplementation(async () => weatherApiMockData);

      const resp = await service.getWeatherForecast(apiDateTime, apiLocation);

      expect(service.fetchWeatherForecastApi).toHaveBeenCalled();
      expect(resp).toStrictEqual(getWeatherForecastResponse);
      expect(resp.length).toEqual(2);
    });

    it('Integration test for weather service with bad data', async () => {
      const resp = await service.getWeatherForecast('2024-01-18', apiLocation);

      expect(resp).toEqual([]);
    });
  });

  describe('FetchWeatherForecastApi', () => {
    it('Calling third party api', async () => {
      const resp = await service.fetchWeatherForecastApi(apiDateTime);

      expect(resp).toStrictEqual(fullApiMockFeb29);
    });
  });

  describe('LookupClosestAreasKeys', () => {
    it('Look up area metadata from api with selected location coordinates', async () => {
      const metadata = weatherApiMockData.area_metadata;

      expect(
        service.lookupClosestAreasKeys(metadata, {
          latitude: 1.375,
          longitude: 103.839,
        }),
      ).toEqual(['0']);

      expect(
        service.lookupClosestAreasKeys(
          [
            {
              name: 'Testing place 1',
              label_location: {
                latitude: 100.0,
                longitude: 300.839,
              },
            },
          ],
          {
            latitude: 1.375,
            longitude: 103.839,
          },
        ),
      ).toEqual([]);
    });
  });
});
