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

@Controller('search-history')
export class SearchHistoryController {
  constructor(private service: SearchHistoryService) {}

  @Get('/')
  @UsePipes(new ValidationPipe())
  async getReport(@Query() query: GetDateTimeQuery, @Res() res: Response) {
    const { dateTime } = query;

    const reportA = this.service.getRecentSearchHistory();
    const reportB = this.service.getSearchHistory(dateTime);

    const [recentSearch, topSearch] = await Promise.all([reportA, reportB]);
    // console.log(data);

    return res.status(HttpStatus.OK).json({ recentSearch, topSearch });
  }
}
