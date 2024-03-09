export const MockHydratedTrafficCamData = [
  {
    location: {
      latitude: 1.29531332,
      longitude: 103.871146,
    },
    location_name: 'Testing 1',
  },
  {
    location: {
      latitude: 1.319541067,
      longitude: 103.8785627,
    },
    location_name: 'Testing 2',
  },
  {
    location: {
      latitude: 1.323957439,
      longitude: 103.8728576,
    },
    location_name: 'Testing 3',
  },
  {
    location: {
      latitude: 1.363519886,
      longitude: 103.905394,
    },
    location_name: 'Testing 4',
  },
];

export const MockReverseGeocodingPendingApiData = [
  {
    lon: 1.29531332,
    lat: 103.871146,
    query: { lon: 1.29531332, lat: 103.871146 },
    formatted: 'Testing 1',
  },
  {
    lat: 1.319541067,
    lon: 103.8785627,
    query: {
      lat: 1.319541067,
      lon: 103.8785627,
    },
    formatted: 'Testing 2',
  },
  {
    lat: 1.323957439,
    lon: 103.8728576,
    query: {
      lat: 1.323957439,
      lon: 103.8728576,
    },
    formatted: 'Testing 3',
  },
  {
    lat: 1.363519886,
    lon: 103.905394,
    query: {
      lat: 1.363519886,
      lon: 103.905394,
    },
    formatted: 'Testing 4',
  },
];

export const MockBatchReverseGeocodingJobApiData = {
  id: 1,
  status: 'pending',
  url: 'http://locahost:3000/mock',
};

export const MockGetReverseGeocodingParams = [
  {
    lat: 1.323957439,
    lon: 103.8728576,
  },
  {
    lat: 1.29531332,
    lon: 103.871146,
  },
  {
    lat: 1.319541067,
    lon: 103.8785627,
  },
  {
    lat: 1.363519886,
    lon: 103.905394,
  },
];

export const MockFullCacheTrafficCamApiData = {
  items: [
    {
      timestamp: '2024-01-02T13:00:00+08:00',
      cameras: [
        {
          timestamp: '2024-01-02T12:58:00+08:00',
          image:
            'https://images.data.gov.sg/api/traffic-images/2024/01/3a4867f7-4347-44fc-b809-0165882fa524.jpg',
          location: {
            latitude: 1.39474081,
            longitude: 103.81797086,
          },
          camera_id: '9702',
          image_metadata: {
            height: 1080,
            width: 1920,
            md5: '92212c69347708262fe9ab7becdc0de7',
          },
        },
        {
          timestamp: '2024-01-02T12:58:00+08:00',
          image:
            'https://images.data.gov.sg/api/traffic-images/2024/01/0b4983ff-c7f2-4ba3-9a88-bd7b637a997f.jpg',
          location: {
            latitude: 1.422857,
            longitude: 103.773005,
          },
          camera_id: '9703',
          image_metadata: {
            height: 1080,
            width: 1920,
            md5: '769f0ae150e3b5a5ee4f0e4dd81e08c0',
          },
        },
        {
          timestamp: '2024-01-02T12:58:00+08:00',
          image:
            'https://images.data.gov.sg/api/traffic-images/2024/01/b675be68-9807-417f-a8c4-e1f97370fcb1.jpg',
          location: {
            latitude: 1.42214311,
            longitude: 103.79542062,
          },
          camera_id: '9704',
          image_metadata: {
            height: 1080,
            width: 1920,
            md5: '965a6588a52f9287d6f1f8e94a594954',
          },
        },
        {
          timestamp: '2024-01-02T12:58:00+08:00',
          image:
            'https://images.data.gov.sg/api/traffic-images/2024/01/22f57839-34a5-4706-91f4-1332208a7407.jpg',
          location: {
            latitude: 1.42627712,
            longitude: 103.78716637,
          },
          camera_id: '9705',
          image_metadata: {
            height: 1080,
            width: 1920,
            md5: '9ea684dda7a3602be313c7b161ee782f',
          },
        },
        {
          timestamp: '2024-01-02T12:58:00+08:00',
          image:
            'https://images.data.gov.sg/api/traffic-images/2024/01/0d05f249-b173-4f5f-8db9-ca4bad0ff6c1.jpg',
          location: {
            latitude: 1.41270056,
            longitude: 103.80642712,
          },
          camera_id: '9706',
          image_metadata: {
            height: 1080,
            width: 1920,
            md5: 'e2bd8775bd977ca45088ddf0f52580a0',
          },
        },
        {
          timestamp: '2024-01-02T12:27:39+08:00',
          image:
            'https://images.data.gov.sg/api/traffic-images/2024/01/68aeca46-dc78-4b36-abab-74c54060ec6d.jpg',
          location: {
            latitude: 1.30145145166066,
            longitude: 103.910596320237,
          },
          camera_id: '3795',
          image_metadata: {
            height: 288,
            width: 352,
            md5: 'b5fb3395e22ca1564fc5c16ef746e8a9',
          },
        },
      ],
    },
  ],
};

export const MockPartialCacheTrafficCamApiData = {
  items: [
    {
      timestamp: '2024-01-02T13:00:00+08:00',
      cameras: [
        {
          timestamp: '2024-01-02T12:58:00+08:00',
          image:
            'https://images.data.gov.sg/api/traffic-images/2024/01/3a4867f7-4347-44fc-b809-0165882fa524.jpg',
          location: {
            latitude: 1.39474081,
            longitude: 103.81797086,
          },
          camera_id: '9702',
          image_metadata: {
            height: 1080,
            width: 1920,
            md5: '92212c69347708262fe9ab7becdc0de7',
          },
        },
        {
          timestamp: '2024-01-02T12:58:00+08:00',
          image:
            'https://images.data.gov.sg/api/traffic-images/2024/01/0b4983ff-c7f2-4ba3-9a88-bd7b637a997f.jpg',
          location: {
            latitude: 1.422857,
            longitude: 103.773005,
          },
          camera_id: '9703',
          image_metadata: {
            height: 1080,
            width: 1920,
            md5: '769f0ae150e3b5a5ee4f0e4dd81e08c0',
          },
        },
        {
          timestamp: '2024-01-02T12:58:00+08:00',
          image:
            'https://images.data.gov.sg/api/traffic-images/2024/01/b675be68-9807-417f-a8c4-e1f97370fcb1.jpg',
          location: {
            latitude: 1.42214311,
            longitude: 103.79542062,
          },
          camera_id: '9704',
          image_metadata: {
            height: 1080,
            width: 1920,
            md5: '965a6588a52f9287d6f1f8e94a594954',
          },
        },
        {
          timestamp: '2024-01-02T12:58:00+08:00',
          image:
            'https://images.data.gov.sg/api/traffic-images/2024/01/22f57839-34a5-4706-91f4-1332208a7407.jpg',
          location: {
            latitude: 1.42627712,
            longitude: 103.78716637,
          },
          camera_id: '9705',
          image_metadata: {
            height: 1080,
            width: 1920,
            md5: '9ea684dda7a3602be313c7b161ee782f',
          },
        },
        {
          timestamp: '2024-01-02T12:58:00+08:00',
          image:
            'https://images.data.gov.sg/api/traffic-images/2024/01/0d05f249-b173-4f5f-8db9-ca4bad0ff6c1.jpg',
          location: {
            latitude: 1.41270056,
            longitude: 103.80642712,
          },
          camera_id: '9706',
          image_metadata: {
            height: 1080,
            width: 1920,
            md5: 'e2bd8775bd977ca45088ddf0f52580a0',
          },
        },
        {
          timestamp: '2024-01-02T12:27:39+08:00',
          image:
            'https://images.data.gov.sg/api/traffic-images/2024/01/68aeca46-dc78-4b36-abab-74c54060ec6d.jpg',
          location: {
            latitude: 1.30145145166066,
            longitude: 103.910596320237,
          },
          camera_id: '3795',
          image_metadata: {
            height: 288,
            width: 352,
            md5: 'b5fb3395e22ca1564fc5c16ef746e8a9',
          },
        },
        {
          timestamp: '2024-01-02T12:58:00+08:00',
          image:
            'https://images.data.gov.sg/api/traffic-images/2024/01/3a4867f7-4347-44fc-b809-0165882fa524.jpg',
          location: {
            latitude: 1.513,
            longitude: 103.51397086,
          },
          camera_id: '9702',
          image_metadata: {
            height: 1080,
            width: 1920,
            md5: '92212c69347708262fe9ab7becdc0de7',
          },
        },
      ],
    },
  ],
};

export const MockCacheLocationList = MockFullCacheTrafficCamApiData.items[0][
  'cameras'
].reduce(
  (res, item, index) => {
    const key = `${item.location.latitude}_${item.location.longitude}`;

    if (!res[key]) {
      res[key] = `Location_${index}`;
    }

    return res;
  },
  { location_list: {} },
);

export const MockHydratedCamLocationData = [
  {
    timestamp: '2024-01-02T12:58:00+08:00',
    image:
      'https://images.data.gov.sg/api/traffic-images/2024/01/3a4867f7-4347-44fc-b809-0165882fa524.jpg',
    location: { latitude: 1.39474081, longitude: 103.81797086 },
    camera_id: '9702',
    image_metadata: {
      height: 1080,
      width: 1920,
      md5: '92212c69347708262fe9ab7becdc0de7',
    },
    location_name: 'Location_0',
  },
  {
    timestamp: '2024-01-02T12:58:00+08:00',
    image:
      'https://images.data.gov.sg/api/traffic-images/2024/01/0b4983ff-c7f2-4ba3-9a88-bd7b637a997f.jpg',
    location: { latitude: 1.422857, longitude: 103.773005 },
    camera_id: '9703',
    image_metadata: {
      height: 1080,
      width: 1920,
      md5: '769f0ae150e3b5a5ee4f0e4dd81e08c0',
    },
    location_name: 'Location_1',
  },
  {
    timestamp: '2024-01-02T12:58:00+08:00',
    image:
      'https://images.data.gov.sg/api/traffic-images/2024/01/b675be68-9807-417f-a8c4-e1f97370fcb1.jpg',
    location: { latitude: 1.42214311, longitude: 103.79542062 },
    camera_id: '9704',
    image_metadata: {
      height: 1080,
      width: 1920,
      md5: '965a6588a52f9287d6f1f8e94a594954',
    },
    location_name: 'Location_2',
  },
  {
    timestamp: '2024-01-02T12:58:00+08:00',
    image:
      'https://images.data.gov.sg/api/traffic-images/2024/01/22f57839-34a5-4706-91f4-1332208a7407.jpg',
    location: { latitude: 1.42627712, longitude: 103.78716637 },
    camera_id: '9705',
    image_metadata: {
      height: 1080,
      width: 1920,
      md5: '9ea684dda7a3602be313c7b161ee782f',
    },
    location_name: 'Location_3',
  },
  {
    timestamp: '2024-01-02T12:58:00+08:00',
    image:
      'https://images.data.gov.sg/api/traffic-images/2024/01/0d05f249-b173-4f5f-8db9-ca4bad0ff6c1.jpg',
    location: { latitude: 1.41270056, longitude: 103.80642712 },
    camera_id: '9706',
    image_metadata: {
      height: 1080,
      width: 1920,
      md5: 'e2bd8775bd977ca45088ddf0f52580a0',
    },
    location_name: 'Location_4',
  },
  {
    timestamp: '2024-01-02T12:27:39+08:00',
    image:
      'https://images.data.gov.sg/api/traffic-images/2024/01/68aeca46-dc78-4b36-abab-74c54060ec6d.jpg',
    location: { latitude: 1.30145145166066, longitude: 103.910596320237 },
    camera_id: '3795',
    image_metadata: {
      height: 288,
      width: 352,
      md5: 'b5fb3395e22ca1564fc5c16ef746e8a9',
    },
    location_name: 'Location_5',
  },
];

export const MockPartialCacheHydratedCamLocationData = [
  ...MockHydratedCamLocationData,
  {
    timestamp: '2024-01-02T12:58:00+08:00',
    image:
      'https://images.data.gov.sg/api/traffic-images/2024/01/3a4867f7-4347-44fc-b809-0165882fa524.jpg',
    location: {
      latitude: 1.513,
      longitude: 103.51397086,
    },
    camera_id: '9702',
    image_metadata: {
      height: 1080,
      width: 1920,
      md5: '92212c69347708262fe9ab7becdc0de7',
    },
    location_name: 'Location_6',
  },
];
