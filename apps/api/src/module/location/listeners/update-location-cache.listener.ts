import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UpdateLocationCacheEvent } from '../events/update-location-cache.event';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class UpdateLocationCacheListener {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  @OnEvent('location-cache.update')
  async updateLocationCache(event: UpdateLocationCacheEvent[]) {
    const locationList: Record<string, string> =
      (await this.cacheManager.get('location-list')) ?? {};

    for (const item of event) {
      locationList[item.uniqueKey] = item.name;
    }

    // Cache for one 30 days
    await this.cacheManager.set('location-list', locationList, {
      ttl: 2592000,
    } as any);
  }
}
