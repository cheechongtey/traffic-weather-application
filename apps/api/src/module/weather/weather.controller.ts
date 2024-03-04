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
import { WeatherService } from './weather.service';
import GetWeatherQuery from './dto/GetWeatherQuery';

@Controller('weather')
export class WeatherController {
  constructor(private service: WeatherService) {}

  @Get('/')
  @UsePipes(new ValidationPipe())
  async findWeather(@Query() query: GetWeatherQuery, @Res() res: Response) {
    const { dateTime, latitude, longitude } = query;
    const resp = await this.service.getWeatherForecast(dateTime, {
      latitude,
      longitude,
    });
    return res.status(HttpStatus.OK).json(resp);
  }
}
