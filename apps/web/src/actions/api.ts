import {
  RecommendSearch,
  TrafficCameraApiResponse,
  TrafficCameraData,
} from '@/common/type/location';
import { ReportData } from '@/common/type/report/type';
import { ForecastData } from '@/common/type/weather';
import { endpoints } from '@/lib/endpoints';

export const onFetchLocationApi = async (dateTime: string) => {
  const searchParams = new URLSearchParams({ dateTime });
  const resp = await fetch(`${endpoints.traffic}?${searchParams}`);

  if (!resp.ok) {
    return {
      dateTime,
      status: resp.status,
      locationData: [],
    };
  }

  const response: TrafficCameraApiResponse = await resp.json();

  return {
    status: resp.status,
    ...response,
  };
};

export const onFetchReportApi = async (dateTime: string) => {
  const searchParams = new URLSearchParams({ dateTime });
  const resp = await fetch(`${endpoints.report}?${searchParams}`);

  if (!resp.ok) {
    return {
      recentSearch: [],
      topSearch: [],
      mostSearched: null,
    };
  }

  const reportData: ReportData = await resp.json();
  return reportData;
};

export const onFetchWeatherApi = async (
  dateTime: string,
  latitude: number,
  longitude: number,
  uuid: string
) => {
  const searchParams = new URLSearchParams({
    uuid,
    dateTime,
    latitude: latitude.toString(),
    longitude: longitude.toString(),
  });
  const resp = await fetch(`${endpoints.weather}?${searchParams}`);

  if (!resp.ok) {
    return [];
  }

  const data: ForecastData[] = await resp.json();
  return data;
};

export const onFetchRecentSearchApi = async (
  uuid: string
): Promise<RecommendSearch> => {
  const searchParams = new URLSearchParams({ uuid });
  const resp = await fetch(`${endpoints.recentSearch}?${searchParams}`);

  if (!resp.ok) {
    return {
      otherRecentSearch: null,
      userRecentSearch: null,
    };
  }

  const data: RecommendSearch = await resp.json();
  return data;
};
