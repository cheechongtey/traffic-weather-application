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
import { TrafficCameraData } from './type/traffic-api.type';

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
      return res.status(HttpStatus.OK).json({
        dateTime,
        locationData: cachedResponse,
      });
    }

    const trafficLocationData = await this.service.getTrafficLocation(dateTime);
    const cameraData = get<TrafficCameraData[]>(
      trafficLocationData,
      'items.0.cameras',
      [],
    );

    if (cameraData.length === 0) {
      const resp = await this.service.getRecentSearch();
      return res.status(HttpStatus.ACCEPTED).json(resp);
    }

    const hydratedData = await this.service.hydrateTrafficCamLocation(
      cameraData,
    );

    if (hydratedData.length !== 0) {
      this.cacheManager.set(`location-${dateTime}`, hydratedData, {
        ttl: 60 * 60 * 24 * 30,
      } as any);
    }

    return res.status(HttpStatus.OK).json({
      dateTime,
      locationData: hydratedData,
    });
  }
}
