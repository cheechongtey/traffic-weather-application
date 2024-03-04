export type TrafficLocationApi = {
  items: TrafficLocationItemData[];
};

export type TrafficLocationItemData = {
  timestamp: string;
  cameras: TrafficCameraData[];
};

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
};
