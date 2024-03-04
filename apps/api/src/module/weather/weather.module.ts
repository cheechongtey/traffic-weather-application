import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { HttpModule } from '../http/http.module';
import { AddSearchHistoryListener } from '../search-history/listener/add-search-history.listener';
import { SearchHistoryService } from '../search-history/search-history.service';
import { PrismaService } from '../persistence/prisma/prisma.service';

@Module({
  imports: [HttpModule],
  controllers: [WeatherController],
  providers: [
    WeatherService,
    SearchHistoryService,
    PrismaService,
    AddSearchHistoryListener,
  ],
})
export class WeatherModule {}
