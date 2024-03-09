import { CoordinatesType } from '../common';
import { RecentSearchData } from '../report/type';

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

export type TrafficCameraApiResponse = {
  dateTime: string;
  locationData: TrafficCameraData[];
};

export type RecommendSearch = {
  otherRecentSearch: RecentSearchData;
  userRecentSearch: RecentSearchData;
};
