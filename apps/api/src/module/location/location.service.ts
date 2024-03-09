import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, flatten } from '@nestjs/common';
import { firstValueFrom, map, retry, timer } from 'rxjs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

import type {
  TrafficCameraData,
  TrafficLocationApi,
} from './type/traffic-api.type';
import type {
  BatchReverseGeocodingCoordinate,
  BatchReverseGeocodingJobApiResponse,
  ReverseGeocodingJobApiResponse,
  ReverseGeocodingJobCompleteApiResponse,
} from './type/geo-api.type';
import { chunkArray } from '@/common/helper/utils';
import endpoints from '@/common/endpoints';
import { HydratedTrafficCamData, LocationCache } from './type/location.type';
import { UpdateLocationCacheEvent } from './events/update-location-cache.event';

@Injectable()
export class LocationService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private eventEmitter: EventEmitter2,
    private readonly httpService: HttpService,
  ) {}

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
    const locationCache: LocationCache =
      (await this.cacheManager.get('location-list')) ?? {};

    const chunkedCamData = chunkArray<TrafficCameraData>(trafficData, 5);
    const newData = [...chunkedCamData];

    const finalData = flatten<HydratedTrafficCamData[][]>(
      await Promise.all(
        newData.map(async (items) => {
          const positions: BatchReverseGeocodingCoordinate[] = items
            .filter(
              (x) =>
                !locationCache[
                  `${x.location.latitude}_${x.location.longitude}`
                ],
            )
            .flatMap((x) => ({
              lat: x.location.latitude,
              lon: x.location.longitude,
            }));

          if (positions.length !== 0) {
            const pendingBatchResp = await this.getReverseGeocoding(positions);
            const addressList = await this.getReverseGeoPendingJob(
              pendingBatchResp.url,
            );

            addressList.forEach((item) => {
              locationCache[`${item.query.lat}_${item.query.lon}`] =
                item.formatted;
            });
          }

          return items.map((item) => ({
            ...item,
            location_name:
              locationCache[
                `${item.location.latitude}_${item.location.longitude}`
              ],
          }));
        }),
      ),
    );

    this.storeLocationCache(finalData);

    return finalData;
  }

  async getReverseGeocoding(positions: BatchReverseGeocodingCoordinate[]) {
    const { data } = await firstValueFrom(
      this.httpService.post<BatchReverseGeocodingJobApiResponse>(
        endpoints.geopifyReverseGeo,
        positions,
      ),
    );

    return data;
  }

  async getReverseGeoPendingJob(url: string) {
    try {
      const instance = this.httpService
        .get<ReverseGeocodingJobApiResponse>(url)
        .pipe(
          map((resp) => {
            if ('status' in resp.data && resp.data.status === 'pending') {
              throw new Error('Maximum attempt on retries');
            }
            return resp.data as ReverseGeocodingJobCompleteApiResponse[];
          }),
          retry({
            count: 12,
            delay(_, retryIndex) {
              console.log(retryIndex);
              return timer(2000);
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

  async storeLocationCache(data: HydratedTrafficCamData[]) {
    const eventArr = [];

    for (const item of data) {
      const event = new UpdateLocationCacheEvent();
      event.uniqueKey = `${item.location.latitude}_${item.location.longitude}`;
      event.lat = item.location.latitude;
      event.long = item.location.longitude;
      event.name = item.location_name;

      eventArr.push(event);
    }

    this.eventEmitter.emit('location-cache.update', eventArr);
  }
}
