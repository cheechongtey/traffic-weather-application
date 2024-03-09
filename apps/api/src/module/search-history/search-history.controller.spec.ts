import { Test, TestingModule } from '@nestjs/testing';
import { SearchHistoryController } from './search-history.controller';
import { SearchHistoryService } from './search-history.service';
import { PrismaService } from '../persistence/prisma/prisma.service';
import { mostSearched, topSearch } from './__mock__/service';
import HttpMocks from 'node-mocks-http';

describe('SearchHistoryController', () => {
  let controller: SearchHistoryController;
  let prisma: PrismaService;
  let service: SearchHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SearchHistoryController],
      providers: [SearchHistoryService, PrismaService],
    }).compile();

    prisma = module.get<PrismaService>(PrismaService);
    controller = module.get<SearchHistoryController>(SearchHistoryController);
    service = module.get<SearchHistoryService>(SearchHistoryService);
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

  describe('Get report api', () => {
    it('Integration test for report API', async () => {
      const response = HttpMocks.createResponse();

      jest.spyOn(service, 'getRecentSearchHistory').mockResolvedValue([]);
      jest.spyOn(service, 'getSearchHistory').mockResolvedValue(topSearch);
      jest
        .spyOn(service, 'getMostSearchedDateTime')
        .mockResolvedValue(mostSearched);

      await controller.getReport({ dateTime: '2024-02-29 00:00:00' }, response);

      expect(service.getRecentSearchHistory).toHaveBeenCalled();
      expect(service.getSearchHistory).toHaveBeenCalled();
      expect(service.getMostSearchedDateTime).toHaveBeenCalled();
      expect(response._getJSONData()).toStrictEqual({
        recentSearch: [],
        topSearch: topSearch,
        mostSearched: mostSearched,
      });
    });
  });
});
