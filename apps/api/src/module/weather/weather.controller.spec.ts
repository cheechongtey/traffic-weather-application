import { Test, TestingModule } from '@nestjs/testing';
import { WeatherController } from './weather.controller';
import { SearchHistoryService } from '../search-history/search-history.service';
import { WeatherService } from './weather.service';
import { PrismaService } from '../persistence/prisma/prisma.service';
import { HttpModule } from '../http/http.module';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { response } from 'express';
import { HttpStatus } from '@nestjs/common';

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

  const mockWeatherService = {
    getWeatherForecast: jest.fn().mockResolvedValueOnce(mockForecast),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, EventEmitterModule.forRoot()],
      controllers: [WeatherController],
      providers: [
        SearchHistoryService,
        PrismaService,
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

  describe('getWeatherForecast', () => {
    it('should get weather forecast', async () => {
      const result = await controller.fetchLocationWeatherForecast(
        {
          dateTime: '2024-02-29T00:00:00',
          latitude: 1.323957439,
          longitude: 103.8728576,
        },
        response,
      );

      expect(service.getWeatherForecast).toHaveBeenCalled();
      expect(result.status).toHaveBeenCalledWith(200);
    });
  });
});
