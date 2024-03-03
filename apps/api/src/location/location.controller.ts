import {
  Controller,
  Get,
  HttpStatus,
  Query,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LocationService } from './location.service';
import { Response } from 'express';

import GetDateTimeQuery from './dto/GetLocationDateTime';

@Controller('location')
export class LocationController {
  constructor(private service: LocationService) {}

  @Get('/')
  @UsePipes(new ValidationPipe())
  async getTrafficLocation(
    @Query() query: GetDateTimeQuery,
    @Res() res: Response,
  ) {
    const { dateTime } = query;

    const trafficLocationData = await this.service.getTrafficLocation(dateTime);
    // const hydatedData =
    //   this.service.hydrateTrafficCamLocation(trafficLocationData);

    return res.status(HttpStatus.OK).json(trafficLocationData);
  }
}
