import { CoordinatesType } from '@/common/type/global';

export type HydratedTrafficCamData = {
  location_name: string;
  location: CoordinatesType;
};

export type LocationCache = Record<string, string>;
