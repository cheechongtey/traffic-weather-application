import { Injectable } from '@nestjs/common';
import { PrismaService } from '../persistence/prisma/prisma.service';
import { MostSearchByDateTime, Prisma } from '@prisma/client';
import dayjs from 'dayjs';
import { get } from 'radash';

@Injectable()
export class SearchHistoryService {
  constructor(private prisma: PrismaService) {}

  async storeSearchHistory(data: Prisma.SearchHistoryCreateInput) {
    return this.prisma.searchHistory.create({
      data,
    });
  }

  async getRecentSearchHistory() {
    try {
      // Query the database
      const searchHistory = await this.prisma.searchHistory.findMany({
        take: 10,
        orderBy: {
          id: 'desc',
        },
      });

      return searchHistory;
    } catch (error) {
      console.log(error);
    }
  }

  async getSearchHistory(dateTime: string) {
    // Convert the date string to a Date object
    try {
      const startDate = dayjs(dateTime).format('YYYY-MM-DD 00');
      const endDate = dayjs(dateTime).format('YYYY-MM-DD 23');

      // Query the database
      const searchHistory = await this.prisma.customSearchHistoryView.findMany({
        where: {
          search_date: {
            gte: startDate,
            lte: endDate,
          },
        },
        take: 10,
        orderBy: {
          search_count: 'desc',
        },
      });
      // console.log(searchHistory);
      return searchHistory;
    } catch (error) {
      console.log(error);
    }
  }

  async getMostSearchedDateTime(dateTime: string) {
    try {
      const startDate = dayjs(dateTime).format('YYYY-MM-DD 00:00:00');
      const endDate = dayjs(dateTime).format('YYYY-MM-DD 23:59:59');

      // Query the database
      const mostSearched: MostSearchByDateTime[] =
        await this.prisma.$queryRawUnsafe(
          `SELECT datetime, search_count
        FROM "MostSearchByDateTime" 
        WHERE datetime >= '${startDate}' AND datetime <= '${endDate}'
        ORDER BY search_count DESC
        LIMIT 1`,
        );

      return get(mostSearched, '0', null);
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}
