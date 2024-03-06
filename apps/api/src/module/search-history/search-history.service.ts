import { Injectable } from '@nestjs/common';
import { PrismaService } from '../persistence/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import dayjs from 'dayjs';

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

  async getSearchHistory(date: string) {
    // Convert the date string to a Date object
    try {
      const targetDate = dayjs(date).format('YYYY-MM-DD HH');
      console.log(targetDate);

      // Query the database
      const searchHistory = await this.prisma.customSearchHistoryView.findMany({
        where: {
          search_date: {
            gte: targetDate,
            lte: targetDate,
          },
        },
        take: 10,
        orderBy: {
          search_count: 'desc',
        },
      });
      console.log(searchHistory);
      return searchHistory;
    } catch (error) {
      console.log(error);
    }
  }
}
