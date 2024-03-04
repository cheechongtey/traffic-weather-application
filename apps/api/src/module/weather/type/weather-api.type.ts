import { CoordinatesType } from '@/common/type/global';

export type WeatherApiResponse = {
  area_metadata: AreaMetadataData[];
  items: WeatherItemsData[];
};

export type AreaMetadataData = {
  name: string;
  label_location: CoordinatesType;
};

export type WeatherItemsData = {
  update_timestamp: string;
  timestamp: string;
  valid_period: {
    start: string;
    end: string;
  };
  forecasts: ForecastData[];
};

export type ForecastData = {
  area: string;
  forecast: string;
};
