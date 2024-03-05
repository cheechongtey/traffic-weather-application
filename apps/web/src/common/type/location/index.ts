import { CoordinatesType } from '../common';

export type TrafficCameraData = {
  timestamp: string;
  image: string;
  location: CoordinatesType;
  camera_id: string;
  image_metadata: {
    height: number;
    width: number;
    md5: string;
  };
  location_name: string;
};
