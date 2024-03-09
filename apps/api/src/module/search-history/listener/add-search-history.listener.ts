import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import { AddSearchHistoryEvent } from '../events/add-search-history.event';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { SearchHistoryService } from '../search-history.service';

@Injectable()
export class AddSearchHistoryListener {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private historyService: SearchHistoryService,
  ) {
    dayjs.extend(utc);
    dayjs.extend(timezone);
  }

  @OnEvent('search-history.store')
  async addSearchHistory(event: AddSearchHistoryEvent) {
    const { latitude, longitude, datetime, uuid } = event;
    const locationList: Record<string, string> =
      (await this.cacheManager.get('location-list')) ?? {};
    const location_name = locationList[`${latitude}_${longitude}`];
    const dateTime = dayjs.utc(`${datetime}Z`).tz('Asia/Singapore').format();

    this.historyService.storeSearchHistory({
      uuid,
      location_name,
      datetime: dateTime,
      location_coordinates: `${latitude}_${longitude}`,
    });
  }
}
