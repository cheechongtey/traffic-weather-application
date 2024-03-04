export type BatchReverseGeocodingCoordinate = {
  lon: number;
  lat: number;
};

export type BatchReverseGeocodingJobApiResponse = {
  id: string;
  status: string;
  url: string;
};

export type ReverseGeocodingJobCompleteApiResponse = {
  query: { lon: number; lat: number };
  lon: number;
  lat: number;
  formatted: string;
};

export type ReverseGeocodingJobPendingApiResponse = Pick<
  BatchReverseGeocodingJobApiResponse,
  'id' | 'status'
>;

export type ReverseGeocodingJobApiResponse =
  | ReverseGeocodingJobPendingApiResponse
  | ReverseGeocodingJobCompleteApiResponse[];
