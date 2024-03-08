import { Test, TestingModule } from '@nestjs/testing';
import { SearchHistoryService } from './search-history.service';
import { PrismaService } from '../persistence/prisma/prisma.service';
import {
  mostSearched,
  recentSearchHistory,
  topSearch,
} from './__mock__/service';

describe('SearchHistoryService', () => {
  let service: SearchHistoryService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SearchHistoryService, PrismaService],
    }).compile();

    prisma = module.get<PrismaService>(PrismaService);
    service = module.get<SearchHistoryService>(SearchHistoryService);
  });

  beforeEach(() => {
    prisma.searchHistory.create = jest.fn();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be defined', () => {
    expect(prisma).toBeDefined();
  });

  it('Get recent search with success', async () => {
    // Mock the Prisma client's findUnique method
    jest
      .spyOn(prisma.searchHistory, 'findMany')
      .mockResolvedValue(recentSearchHistory);

    const successRes = await service.getRecentSearchHistory();
    expect(successRes).toEqual(recentSearchHistory);
  });

  it('Get recent search with error', async () => {
    // Mock the Prisma client's findUnique method
    jest
      .spyOn(prisma.searchHistory, 'findMany')
      .mockRejectedValue(new Error('Async error'));

    const res = await service.getRecentSearchHistory();
    expect(res).toEqual([]);
  });

  it('Get top 10 search - success', async () => {
    // Mock the Prisma client's findUnique method
    jest
      .spyOn(prisma.customSearchHistoryView, 'findMany')
      .mockResolvedValue(topSearch);

    const res = await service.getSearchHistory('2024-02-29T00:00:00');
    expect(res).toEqual(topSearch);
  });

  it('Get top 10 search - error', async () => {
    // Mock the Prisma client's findUnique method
    jest
      .spyOn(prisma.searchHistory, 'findMany')
      .mockRejectedValue(new Error('Async error'));

    const res = await service.getSearchHistory('2442323123');
    expect(res).toEqual([]);
  });

  it('Get most searched datetime + location - success', async () => {
    // Mock the Prisma client's findUnique method
    jest.spyOn(prisma, '$queryRawUnsafe').mockResolvedValue([mostSearched]);

    const res = await service.getMostSearchedDateTime('2024-02-29T00:00:00');
    expect(res).toEqual(mostSearched);
  });

  it('Get most searched datetime + location - failed', async () => {
    jest
      .spyOn(prisma, '$queryRawUnsafe')
      .mockRejectedValue(new Error('Async error'));

    const res = await service.getMostSearchedDateTime('2024-02-29T00:00:00');
    expect(res).toEqual({});
  });

  it('should add new entry to search history', async () => {
    jest.spyOn(prisma.searchHistory, 'create').mockResolvedValue({
      id: 1,
      uuid: 'testing-1',
      datetime: new Date('2024-02-29 00:00:00'),
      location_name: 'Geylang',
      location_coordinates: '1.333_109.333',
      createdAt: new Date('2024-02-29 00:00:00'),
    });

    await service.storeSearchHistory({
      uuid: 'testing-1',
      datetime: new Date('2024-02-29 00:00:00'),
      location_name: 'Geylang',
      location_coordinates: '1.333_109.333',
      createdAt: new Date('2024-02-29 00:00:00'),
    });

    expect(prisma.searchHistory.create).toHaveBeenCalledWith({
      data: {
        uuid: 'testing-1',
        datetime: new Date('2024-02-29 00:00:00'),
        location_name: 'Geylang',
        location_coordinates: '1.333_109.333',
        createdAt: new Date('2024-02-29 00:00:00'),
      },
    });
  });
});
