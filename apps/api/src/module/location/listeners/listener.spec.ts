// your.listener.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { PrismaService } from '@/module/persistence/prisma/prisma.service';
import { UpdateLocationCacheListener } from './update-location-cache.listener';
import { UpdateLocationCacheEvent } from '../events/update-location-cache.event';
import { Cache } from 'cache-manager';

describe('UpdateLocationCache', () => {
  let listener: UpdateLocationCacheListener;
  let cache: Cache;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        UpdateLocationCacheListener,
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: () => {},
            set: () => jest.fn(),
          },
        },
      ],
    }).compile();

    listener = module.get<UpdateLocationCacheListener>(
      UpdateLocationCacheListener,
    );
    cache = module.get(CACHE_MANAGER);

    await module.init();
  });

  it('should handle the event correctly', () => {
    const event = new UpdateLocationCacheEvent();
    event.uniqueKey = `1.323957439_103.8728576`;
    event.lat = 1.323957439;
    event.long = 103.8728576;
    event.name = 'Location 1';

    jest.spyOn(cache, 'set').mockImplementation();

    listener.updateLocationCache([event]);
  });
});
