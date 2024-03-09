import {
  TrafficCameraApiResponse,
  TrafficCameraData,
} from '@/common/type/location';
import { ReportData } from '@/common/type/report/type';
import { ForecastData } from '@/common/type/weather';
import { endpoints } from '@/lib/endpoints';

export const onFetchLocationApi = async (dateTime: string) => {
  const searchParams = new URLSearchParams({ dateTime });
  const resp = await fetch(`${endpoints.traffic}?${searchParams}`);
  const response: TrafficCameraApiResponse = await resp.json();

  return {
    status: resp.status,
    ...response,
  };
};

export const onFetchReportApi = async (dateTime: string) => {
  const searchParams = new URLSearchParams({ dateTime });
  const resp = await fetch(`${endpoints.report}?${searchParams}`);
  const reportData: ReportData = await resp.json();
  return reportData;
};

export const onFetchWeatherApi = async (
  dateTime: string,
  latitude: number,
  longitude: number
) => {
  const searchParams = new URLSearchParams({
    dateTime,
    latitude: latitude.toString(),
    longitude: longitude.toString(),
  });
  const resp = await fetch(`${endpoints.weather}?${searchParams}`);
  const data: ForecastData[] = await resp.json();
  return data;
};
