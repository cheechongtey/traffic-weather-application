import endpoints from '@/common/endpoints';
import { CoordinatesType } from '@/common/type/global';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import {
  AreaMetadataData,
  ForecastData,
  WeatherApiResponse,
} from './type/weather-api.type';
import { getDistance } from 'geolib';
import { get } from 'radash';

@Injectable()
export class WeatherService {
  constructor(private readonly httpService: HttpService) {}

  async getWeatherForecast(
    dateTime: string,
    location: CoordinatesType,
  ): Promise<any> {
    try {
      const { area_metadata, items } = await this.fetchWeatherForecastApi(
        dateTime,
      );

      const forecastData = get<ForecastData[]>(items, '0.forecasts', []);
      const areasDataIndex = this.lookupClosestAreasKeys(
        area_metadata,
        location,
      );
      const areaForecastData = this.getAreaWeatherForecast(
        forecastData,
        areasDataIndex,
      );

      return areaForecastData;
    } catch (e) {
      return [];
    }
  }

  async fetchWeatherForecastApi(dateTime: string) {
    try {
      const { data } = await this.httpService.axiosRef.get<WeatherApiResponse>(
        endpoints.weatherForecast,
        {
          params: {
            date_time: dateTime,
          },
        },
      );

      return data;
    } catch (e) {
      throw e;
    }
  }

  lookupClosestAreasKeys(
    areaMedataData: AreaMetadataData[],
    coordinates: CoordinatesType,
  ) {
    let closestDistance = Infinity;
    const arr: string[] = [];

    for (const key in areaMedataData) {
      const coord = areaMedataData[key];
      const distance = getDistance(coordinates, coord.label_location);
      // Show up to 10km weather forecast
      if (distance < closestDistance && distance <= 10000) {
        closestDistance = distance;
        // closestCoordinatesIndex = key;
        arr.unshift(key);
      }
    }

    return arr!;
  }

  getAreaWeatherForecast(
    data: ForecastData[],
    closestAreaKeys: string[],
  ): ForecastData[] {
    return closestAreaKeys.map((x) => data[x]);
  }
}
