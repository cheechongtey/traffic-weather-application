import {
  Controller,
  Get,
  HttpStatus,
  Query,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { WeatherService } from './weather.service';
import GetWeatherQuery from './dto/GetWeatherQuery';
import { AddSearchHistoryEvent } from '../search-history/events/add-search-history.event';

@Controller('weather')
export class WeatherController {
  constructor(
    private service: WeatherService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Get('/')
  @UsePipes(new ValidationPipe())
  async fetchLocationWeatherForecast(
    @Query() query: GetWeatherQuery,
    @Res() res: Response,
  ) {
    const { dateTime, latitude, longitude, uuid } = query;
    const event = new AddSearchHistoryEvent();
    event.datetime = dateTime;
    event.latitude = latitude;
    event.longitude = longitude;
    event.uuid = uuid;
    console.log(event);
    this.eventEmitter.emit('search-history.store', event);

    const resp = await this.service.getWeatherForecast(dateTime, {
      latitude,
      longitude,
    });

    return res.status(HttpStatus.OK).json(resp);
  }
}
