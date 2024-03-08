import { Test, TestingModule } from '@nestjs/testing';
import { SearchHistoryController } from './search-history.controller';
import { SearchHistoryService } from './search-history.service';
import { PrismaService } from '../persistence/prisma/prisma.service';
import {
  mostSearched,
  recentSearchHistory,
  topSearch,
} from './__mock__/service';
import { Response } from 'express';

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
    const mockResponse = () => {
      const res = {} as unknown as Response;
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);
      return res;
    };
    const response = mockResponse();

    it('Integration test for report API', async () => {
      jest
        .spyOn(service, 'getRecentSearchHistory')
        .mockResolvedValue(recentSearchHistory);
      jest.spyOn(service, 'getSearchHistory').mockResolvedValue(topSearch);
      jest
        .spyOn(service, 'getMostSearchedDateTime')
        .mockResolvedValue(mostSearched);

      await controller.getReport({ dateTime: '2024-02-29 00:00:00' }, response);

      expect(service.getRecentSearchHistory).toHaveBeenCalled();
      expect(service.getSearchHistory).toHaveBeenCalled();
      expect(service.getMostSearchedDateTime).toHaveBeenCalled();
      expect(response.json).toHaveBeenCalledWith({
        recentSearch: recentSearchHistory,
        topSearch: topSearch,
        mostSearched: mostSearched,
      });
    });
  });
});
