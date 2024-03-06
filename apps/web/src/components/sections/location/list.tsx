'use client';

import { TrafficCameraData } from '@/common/type/location';
import LocationCard from '@/components/ui/location-card';
import React, { useMemo, useState } from 'react';
import { LocationPagination } from './pagination';
import { calculateTotalPages, cn, paginateData } from '@/lib/utils';

const LocationList = ({
  locationData,
  selectedIndex,
  onSelectLocation,
}: {
  locationData: TrafficCameraData[];
  selectedIndex: number;
  onSelectLocation: (
    index: number,
    latitude: number,
    longitude: number
  ) => void;
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(1);
  const [selectedLocation, setSelectedLocation] = useState<number>();

  const chunkData = useMemo(() => {
    return paginateData<TrafficCameraData>(locationData, activeIndex, 9);
  }, [activeIndex, locationData]);
  const totalPages = useMemo(() => {
    return calculateTotalPages(locationData.length, 9);
  }, [locationData]);

  const onSelectCard = (item: TrafficCameraData, index: number) => {
    setSelectedLocation(index);
    onSelectLocation(index, item.location.latitude, item.location.longitude);
  };

  return (
    <div>
      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-6'>
        {chunkData.map((x, index) => (
          <LocationCard
            {...x}
            name={x.location_name}
            key={index}
            className={cn({ 'bg-secondary': selectedLocation === index })}
            onClick={() => onSelectCard(x, index)}
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
