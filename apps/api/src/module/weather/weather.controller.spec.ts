import { Test, TestingModule } from '@nestjs/testing';
import { WeatherController } from './weather.controller';
import { SearchHistoryService } from '../search-history/search-history.service';
import { WeatherService } from './weather.service';
import { PrismaService } from '../persistence/prisma/prisma.service';
import { HttpModule } from '../http/http.module';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { EventEmitterModule } from '@nestjs/event-emitter';

describe('WeatherController', () => {
  let controller: WeatherController;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, EventEmitterModule.forRoot()],
      controllers: [WeatherController],
      providers: [
        SearchHistoryService,
        WeatherService,
        PrismaService,
        { provide: CACHE_MANAGER, useValue: {} },
      ],
    }).compile();

    prisma = module.get<PrismaService>(PrismaService);
    controller = module.get<WeatherController>(WeatherController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be defined', () => {
    expect(prisma).toBeDefined();
  });
});
