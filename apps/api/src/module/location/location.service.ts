import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom, map, retry, timer } from 'rxjs';

import type {
  TrafficCameraData,
  TrafficLocationApi,
} from './type/traffic-api.type';
import type {
  BatchReverseGeocodingCoordinate,
  BatchReverseGeocodingJobApiResponse,
} from './type/geo-api.type';
import { chunkArray } from '@/common/helper/utils';
import endpoints from '@/common/endpoints';

@Injectable()
export class LocationService {
  constructor(private readonly httpService: HttpService) {}

  async getTrafficLocation(dateTime: string): Promise<TrafficLocationApi> {
    const { data } = await firstValueFrom(
      this.httpService.get<TrafficLocationApi>(endpoints.trafficImage, {
        params: {
          date_time: dateTime,
        },
      }),
    );
    return data;
  }

  async hydrateTrafficCamLocation(trafficData: TrafficCameraData[]) {
    // Chunk cam location data into 10
    const chunkedCamData = chunkArray<TrafficCameraData>(trafficData, 10);
    const newData = [chunkedCamData[0]];
    const finalData = await Promise.all(
      newData.map(async (item) => {
        const positions: BatchReverseGeocodingCoordinate[] = item.flatMap(
          (x) => ({
            lat: x.location.latitude,
            lon: x.location.longitude,
          }),
        );
        const pendingBatchResp = await this.getReverseGeocoding(positions);
        const batchResp = await this.getReverseGeoPendingJob(
          pendingBatchResp.url,
        );
        console.log(batchResp);
        // console.log(resp);

        return batchResp;
      }),
    );

    return finalData;
  }

  async getReverseGeocoding(positions: BatchReverseGeocodingCoordinate[]) {
    const { data } = await firstValueFrom(
      this.httpService.post<BatchReverseGeocodingJobApiResponse>(
        endpoints.geopifyReverseGeo + '&type=street',
        positions,
      ),
    );

    return data;
  }

  async getReverseGeoPendingJob(url: string) {
    try {
      const instance = this.httpService.get(url).pipe(
        map((resp) => {
          if (resp.data.status && resp.data.status === 'pending') {
            throw new Error('Maximum attempt on retries');
          }

          return resp.data;
        }),
        retry({
          count: 8,
          delay(_, retryIndex) {
            console.log(retryIndex);
            const interval = 200;
            const delay = Math.pow(2, retryIndex - 1) * interval;
            return timer(delay);
          },
          resetOnSuccess: false,
        }),
      );

      const response = await firstValueFrom(instance);

      return response;
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
      }
      return [];
    }
  }

  async storeLocationCache() {}
}
