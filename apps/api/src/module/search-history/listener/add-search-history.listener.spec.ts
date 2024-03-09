// your.listener.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AddSearchHistoryListener } from './add-search-history.listener';
import { SearchHistoryService } from '../search-history.service';
import { AddSearchHistoryEvent } from '../events/add-search-history.event';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { PrismaService } from '@/module/persistence/prisma/prisma.service';

describe('AddSearchHistoryListener', () => {
  let listener: AddSearchHistoryListener;
  let service: SearchHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddSearchHistoryListener,
        SearchHistoryService,
        PrismaService,
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: () => {},
            set: () => jest.fn(),
          },
        },
      ],
    }).compile();

    listener = module.get<AddSearchHistoryListener>(AddSearchHistoryListener);
    service = module.get<SearchHistoryService>(SearchHistoryService);

    await module.init();
  });

  it('should handle the event correctly', () => {
    jest.spyOn(service, 'storeSearchHistory').mockImplementation();

    const event = new AddSearchHistoryEvent();
    event.datetime = '2024-02-29T00:00:00';
    event.latitude = 1.323957439;
    event.longitude = 103.8728576;

    listener.addSearchHistory(event);

    // expect(service.storeSearchHistory).toHaveBeenCalled();
  });
});
