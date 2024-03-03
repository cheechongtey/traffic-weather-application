import {
  Controller,
  Get,
  HttpStatus,
  Inject,
  Query,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LocationService } from './location.service';
import { Response } from 'express';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import GetDateTimeQuery from './dto/GetLocationDateTime';
import { get } from 'radash';
import { TrafficCameraData } from './location.type';

@Controller('location')
export class LocationController {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private service: LocationService,
  ) {}

  @Get('/')
  @UsePipes(new ValidationPipe())
  async getTrafficLocation(
    @Query() query: GetDateTimeQuery,
    @Res() res: Response,
  ) {
    const { dateTime } = query;
    const cachedResponse = await this.cacheManager.get(`location-${dateTime}`);

    if (cachedResponse) {
      console.log('Found cache');
      const cameraData = get<TrafficCameraData[]>(
        cachedResponse,
        'items.0.cameras',
        [],
      );
      const data = await this.service.hydrateTrafficCamLocation(cameraData);
      return res.status(HttpStatus.OK).json(data);
    }

    const trafficLocationData = await this.service.getTrafficLocation(dateTime);
    const cameraData = get<TrafficCameraData[]>(
      trafficLocationData,
      'items.0.cameras',
      [],
    );
    const hydratedData = this.service.hydrateTrafficCamLocation(cameraData);
    console.log(hydratedData);

    await this.cacheManager.set(`location-${dateTime}`, trafficLocationData);

    return res.status(HttpStatus.OK).json(trafficLocationData);
  }
}
