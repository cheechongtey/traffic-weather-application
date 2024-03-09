import { Test, TestingModule } from '@nestjs/testing';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { WeatherController } from './weather.controller';
import { SearchHistoryService } from '../search-history/search-history.service';
import { WeatherService } from './weather.service';
import { PrismaService } from '../persistence/prisma/prisma.service';
import { HttpModule } from '../http/http.module';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Response } from 'express';
import { AddSearchHistoryEvent } from '../search-history/events/add-search-history.event';

const mockForecast = [
  {
    area: 'Geylang',
    forecast: 'Fair (Night)',
  },
  {
    area: 'City',
    forecast: 'Fair (Night)',
  },
  {
    area: 'Bishan',
    forecast: 'Fair (Night)',
  },
  {
    area: 'Bedok',
    forecast: 'Fair (Night)',
  },
  {
    area: 'Ang Mo Kio',
    forecast: 'Fair (Night)',
  },
];

describe('WeatherController', () => {
  let controller: WeatherController;
  let service: WeatherService;
  let prisma: PrismaService;
  let eventEmitter: EventEmitter2;

  const mockWeatherService = {
    getWeatherForecast: jest.fn().mockResolvedValueOnce(mockForecast),
  };

  const res = {} as unknown as Response;
  res.json = jest.fn().mockReturnValue(mockForecast);
  res.status = jest.fn(() => res); // chained

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [WeatherController],
      providers: [
        SearchHistoryService,
        PrismaService,
        {
          provide: EventEmitter2,
          useValue: {
            emit: jest.fn(),
          },
        },
        { provide: CACHE_MANAGER, useValue: {} },
        {
          provide: WeatherService,
          useValue: mockWeatherService,
        },
      ],
    }).compile();

    service = module.get<WeatherService>(WeatherService);
    prisma = module.get<PrismaService>(PrismaService);
    controller = module.get<WeatherController>(WeatherController);
    eventEmitter = module.get<EventEmitter2>(EventEmitter2);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be defined', () => {
    expect(prisma).toBeDefined();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const mockResponse = () => {
    const res = {} as unknown as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  describe('getWeatherForecast', () => {
    const event = new AddSearchHistoryEvent();
    event.datetime = '2024-02-29T00:00:00';
    event.latitude = 1.323957439;
    event.longitude = 103.8728576;
    event.uuid = '123123';

    it('should return 200 with forecast data', async () => {
      const response = mockResponse();
      await controller.fetchLocationWeatherForecast(
        {
          dateTime: '2024-02-29T00:00:00',
          latitude: 1.323957439,
          longitude: 103.8728576,
          uuid: '123123',
        },
        response,
      );

      expect(eventEmitter.emit).toHaveBeenCalledTimes(1);
      expect(eventEmitter.emit).toHaveBeenCalledWith(
        'search-history.store',
        event,
      );
      expect(service.getWeatherForecast).toHaveBeenCalled();
      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.json).toHaveBeenCalledWith(mockForecast);
    });

    // Verify how to pass invalid date time to trigger validation check
    // it('should return 400 with', async () => {
    //   const response = mockResponse();
    //   await controller.fetchLocationWeatherForecast(
    //     {
    //       dateTime: '123',
    //       latitude: 1.323957439,
    //       longitude: 103.8728576,
    //     },
    //     response,
    //   );

    //   expect(response.status).toHaveBeenCalledWith(400);
    // });
  });
});
