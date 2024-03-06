'use client';

import { TrafficCameraData } from '@/common/type/location';
import LocationCard from '@/components/ui/location-card';
import React, { useMemo, useState } from 'react';
import { LocationPagination } from './pagination';
import { calculateTotalPages, paginateData } from '@/lib/utils';

const LocationList = ({
  locationData,
}: {
  locationData: TrafficCameraData[];
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(1);
  const chunkData = useMemo(() => {
    return paginateData<TrafficCameraData>(locationData, activeIndex, 9);
  }, [activeIndex, locationData]);
  const totalPages = useMemo(() => {
    return calculateTotalPages(locationData.length, 9);
  }, [locationData]);

  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
        {chunkData.map((x, index) => (
          <LocationCard
            {...x}
            name={x.location_name}
            onClick={() => {}}
            key={index}
          />
        ))}
      </div>
      <LocationPagination
        activeIndex={activeIndex}
        onChangePage={setActiveIndex}
        totalPages={totalPages}
      />
    </div>
  );
};

export default LocationList;
