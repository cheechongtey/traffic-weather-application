import { Injectable } from '@nestjs/common';
import { PrismaService } from '../persistence/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class SearchHistoryService {
  constructor(private prisma: PrismaService) {}

  async storeSearchHistory(data: Prisma.SearchHistoryCreateInput) {
    return this.prisma.searchHistory.create({
      data,
    });
  }
}
