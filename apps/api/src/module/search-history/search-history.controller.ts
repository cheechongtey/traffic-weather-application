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

    const top10Report = await this.service.getSearchHistory(dateTime);
    return res.status(HttpStatus.OK).json({
      top10Report,
    });
  }
}
