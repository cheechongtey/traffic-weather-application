import { TrafficCameraData } from './traffic-api.type';

export type HydratedTrafficCamData = {
  location_name: string;
} & TrafficCameraData;

export type LocationCache = Record<string, string>;
