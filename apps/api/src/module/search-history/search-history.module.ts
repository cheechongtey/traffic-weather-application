import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { SearchHistoryController } from './search-history.controller';
import { SearchHistoryService } from './search-history.service';
import { PrismaService } from '../persistence/prisma/prisma.service';

@Module({
  imports: [HttpModule],
  controllers: [SearchHistoryController],
  providers: [SearchHistoryService, PrismaService],
})
export class SearchHistoryModule {}
