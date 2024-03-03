import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { TrafficLocationApi } from './location.type';

@Injectable()
export class LocationService {
  constructor(private readonly httpService: HttpService) {}

  async getTrafficLocation(dateTime: string): Promise<TrafficLocationApi> {
    const { data } = await firstValueFrom(
      this.httpService.get<TrafficLocationApi>(
        'https://api.data.gov.sg/v1/transport/traffic-images',
        {
          params: {
            date_time: dateTime,
          },
        },
      ),
    );
    return data;
  }

  async hydrateTrafficCamLocation(trafficData: TrafficLocationApi) {
    console.log(trafficData);
    // const { cameras } = trafficData;
    // const camerasChunk =
  }
}
