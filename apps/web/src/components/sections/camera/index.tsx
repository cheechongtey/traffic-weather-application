'use client';

import { TrafficCameraData } from '@/common/type/location';
import LocationCard from '@/components/ui/location-card';
import React, { useMemo, useState } from 'react';
import { calculateTotalPages, cn, paginateData } from '@/lib/utils';
import { CustomPagination } from '@/components/ui/custom-pagination';

const CameraSection = ({
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
    <div className='border-t pt-10 mt-10'>
      <h3 className='text-xl font-bold mb-6'>Traffic Camera</h3>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mb-6'>
        {chunkData.map((x, index) => (
          <LocationCard
            {...x}
            name={x.location_name}
            key={index}
            imageUrl={x.image}
            imageHeight={x.image_metadata.height}
            imageWidth={x.image_metadata.width}
          />
        ))}
      </div>
      <CustomPagination
        activeIndex={activeIndex}
        onChangePage={setActiveIndex}
        totalPages={totalPages}
      />
    </div>
  );
};

export default CameraSection;
