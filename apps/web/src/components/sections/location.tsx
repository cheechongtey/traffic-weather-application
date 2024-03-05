'use client';

import React from 'react';
import LocationCard from '../ui/location-card';
import { TrafficCameraData } from '@/common/type/location';

const Location = ({ locationData }: { locationData: TrafficCameraData[] }) => {
  const data = [
    {
      timestamp: '2024-01-03T12:57:37+08:00',
      image:
        'https://images.data.gov.sg/api/traffic-images/2024/01/ab24b8cc-12a7-49e8-b3f1-8d338f825348.jpg',
      location: { latitude: 1.29531332, longitude: 103.871146 },
      camera_id: '1001',
      image_metadata: {
        height: 240,
        width: 320,
        md5: '2a06783352c2dcb54eb42c34e28cebe2',
      },
      location_name: 'KPE/ECP, East Coast Parkway, Singapore 437440, Singapore',
    },
    {
      timestamp: '2024-01-03T12:57:37+08:00',
      image:
        'https://images.data.gov.sg/api/traffic-images/2024/01/b8b9ef0f-37e9-4e4b-890f-3a536b4e018f.jpg',
      location: { latitude: 1.319541067, longitude: 103.8785627 },
      camera_id: '1002',
      image_metadata: {
        height: 240,
        width: 320,
        md5: 'f46f2c438ae4ff2d95d38b3d4edfc7bc',
      },
      location_name:
        'Kallang Bahru, Aljunied Walk, Singapore 387293, Singapore',
    },
    {
      timestamp: '2024-01-03T12:57:37+08:00',
      image:
        'https://images.data.gov.sg/api/traffic-images/2024/01/1a6bb815-a0c6-42fc-912b-001bee41e8e1.jpg',
      location: { latitude: 1.323957439, longitude: 103.8728576 },
      camera_id: '1003',
      image_metadata: {
        height: 240,
        width: 320,
        md5: '180643583dc601e9ddb9db84d56521fc',
      },
      location_name:
        'KPE/PIE, Pan-Island Expressway, Singapore 339630, Singapore',
    },
    {
      timestamp: '2024-01-03T12:57:37+08:00',
      image:
        'https://images.data.gov.sg/api/traffic-images/2024/01/d50493cd-f363-45f3-9c0e-353cdc34aa23.jpg',
      location: { latitude: 1.319535712, longitude: 103.8750668 },
      camera_id: '1004',
      image_metadata: {
        height: 240,
        width: 320,
        md5: 'bdfbccd41f985d491af13ae0b50ccf37',
      },
      location_name: 'Kallang Way Flyover, Singapore 339695, Singapore',
    },
    {
      timestamp: '2024-01-03T12:57:37+08:00',
      image:
        'https://images.data.gov.sg/api/traffic-images/2024/01/1a5434c2-1273-479a-9b6b-b63bf7069383.jpg',
      location: { latitude: 1.363519886, longitude: 103.905394 },
      camera_id: '1005',
      image_metadata: {
        height: 240,
        width: 320,
        md5: '7724e5eef289c982782ef11c98ff6ae7',
      },
      location_name:
        'Defu Flyover, Kallang-Paya Lebar Expressway, Singapore 530325, Singapore',
    },
    {
      timestamp: '2024-01-03T12:57:37+08:00',
      image:
        'https://images.data.gov.sg/api/traffic-images/2024/01/b5f6cb81-8e90-474e-89c9-2a9f07fbbd68.jpg',
      location: { latitude: 1.357098686, longitude: 103.902042 },
      camera_id: '1006',
      image_metadata: {
        height: 240,
        width: 320,
        md5: 'e8d5950998babf90d5509e5ca25edac8',
      },
      location_name:
        'Kallang-Paya Lebar Expressway, Singapore 539356, Singapore',
    },
    {
      timestamp: '2024-01-03T12:57:37+08:00',
      image:
        'https://images.data.gov.sg/api/traffic-images/2024/01/00fe180f-5c0b-4c5b-9c4b-67bc917b048d.jpg',
      location: { latitude: 1.365434, longitude: 103.953997 },
      camera_id: '1111',
      image_metadata: {
        height: 1080,
        width: 1920,
        md5: '406d30730b595417bbec32432e43a974',
      },
      location_name: 'Tampines Expressway, Singapore 510126, Singapore',
    },
    {
      timestamp: '2024-01-03T12:57:37+08:00',
      image:
        'https://images.data.gov.sg/api/traffic-images/2024/01/527847e5-9b84-4530-b7df-c7dc205826f8.jpg',
      location: { latitude: 1.3605, longitude: 103.961412 },
      camera_id: '1112',
      image_metadata: {
        height: 1080,
        width: 1920,
        md5: '68a965ab65f1af30be3a5942ca1e14fb',
      },
      location_name: 'Loyang Avenue, Singapore 510149, Singapore',
    },
    {
      timestamp: '2024-01-03T12:57:37+08:00',
      image:
        'https://images.data.gov.sg/api/traffic-images/2024/01/fe302479-4d1b-4321-9001-70e81bf376db.jpg',
      location: { latitude: 1.317036, longitude: 103.988598 },
      camera_id: '1113',
      image_metadata: {
        height: 1080,
        width: 1920,
        md5: '6bbb9280699b7a8f6d69d5d1eddcd7cd',
      },
      location_name: 'On-Road Cycling Lane, Singapore 498736, Singapore',
    },
    {
      timestamp: '2024-01-03T12:57:37+08:00',
      image:
        'https://images.data.gov.sg/api/traffic-images/2024/01/efdad8a6-6d47-4829-86fb-f61e47bc5819.jpg',
      location: { latitude: 1.27414394350065, longitude: 103.851316802547 },
      camera_id: '1501',
      image_metadata: {
        height: 240,
        width: 320,
        md5: 'da61e93577032d77e9bb60a827313eab',
      },
      location_name:
        'Maxwell Road, Marina Coastal Expressway, Singapore 018962, Singapore',
    },
    {
      timestamp: '2024-01-03T12:57:37+08:00',
      image:
        'https://images.data.gov.sg/api/traffic-images/2024/01/0d2d23a1-ca70-46dd-ac2b-81eb8bd2acc4.jpg',
      location: { latitude: 1.27135090682664, longitude: 103.861828440597 },
      camera_id: '1502',
      image_metadata: {
        height: 240,
        width: 320,
        md5: '28529b72ff24cc4fcc06389bb26852e0',
      },
      location_name:
        'Marina Boulevard/Marina Coastal Drive, Marina Link, Singapore 018988, Singapore',
    },
  ];
  return (
    <section>
      <div className='container py-6 border-b'>
        <h3 className='text-xl font-bold mb-6'>Popular Locations</h3>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {locationData.map((x, index) => (
            <LocationCard
              {...x}
              name={x.location_name}
              onClick={() => {}}
              key={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Location;
