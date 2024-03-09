import {
  Controller,
  Get,
  HttpStatus,
  Query,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import GetDateTimeQuery from '../location/dto/GetLocationDateTime';
import { Response } from 'express';
import { SearchHistoryService } from './search-history.service';
import GetRecommendMessageQuery from './dto/GetWeatherQuery';

@Controller('search-history')
export class SearchHistoryController {
  constructor(private service: SearchHistoryService) {}

  @Get('/')
  @UsePipes(new ValidationPipe())
  async getReport(@Query() query: GetDateTimeQuery, @Res() res: Response) {
    const { dateTime } = query;

    const reportA = this.service.getRecentSearchHistory();
    const reportB = this.service.getSearchHistory(dateTime);
    const reportC = this.service.getMostSearchedDateTime(dateTime);

    const [recentSearch, topSearch, mostSearched] = await Promise.all([
      reportA,
      reportB,
      reportC,
    ]);
    return res
      .status(HttpStatus.OK)
      .json({ recentSearch, topSearch, mostSearched });
  }

  @Get('/recent-search')
  async getRecentSearch(
    @Query() query: GetRecommendMessageQuery,
    @Res() res: Response,
  ) {
    const { uuid } = query;
    const userRecentSearch = await this.service.getRecommendMessage(
      uuid,
      false,
    );
    const otherRecentSearch = await this.service.getRecommendMessage(
      uuid,
      true,
    );

    return res
      .status(HttpStatus.OK)
      .json({ userRecentSearch, otherRecentSearch });
  }
}
