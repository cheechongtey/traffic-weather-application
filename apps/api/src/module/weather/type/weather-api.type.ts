export type WeatherApiResponse = {
  area_metadata: AreaMetadataData[];
  items: WeatherItemsData[];
};

type AreaMetadataData = {
  name: string;
  label_location: CoordinatesType;
};

type WeatherItemsData = {
  update_timestamp: string;
  timestamp: string;
  valid_period: {
    start: string;
    end: string;
  };
  forecasts: ForecastData[];
};

type ForecastData = {
  area: string;
  forecast: string;
};
