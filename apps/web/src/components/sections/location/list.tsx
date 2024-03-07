'use client';

import { TrafficCameraData } from '@/common/type/location';
import LocationCard from '@/components/ui/location-card';
import React, { useMemo, useState } from 'react';
import { CustomPagination } from '@/components/ui/custom-pagination';
import { calculateTotalPages, cn, paginateData } from '@/lib/utils';
import WeatherSection from '../weather';
import { ForecastData } from '@/common/type/weather';

const LocationList = ({
  locationData,
  selectedIndex,
  forecastData,
  isForecastFetching,
  showForecast,
  onSelectLocation,
}: {
  locationData: TrafficCameraData[];
  forecastData: ForecastData[];
  selectedIndex: number;
  isForecastFetching: boolean;
  showForecast: boolean;
  onSelectLocation: (
    index: number,
    latitude: number,
    longitude: number
  ) => void;
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(1);
  const [selectedLocation, setSelectedLocation] = useState<number>();

  const chunkData = useMemo(() => {
    return paginateData<TrafficCameraData>(locationData, activeIndex, 6);
  }, [activeIndex, locationData]);
  const totalPages = useMemo(() => {
    return calculateTotalPages(locationData.length, 6);
  }, [locationData]);

  const onSelectCard = (item: TrafficCameraData, index: number) => {
    setSelectedLocation(index);
    onSelectLocation(index, item.location.latitude, item.location.longitude);
  };

  return (
    <div>
      <CustomPagination
        activeIndex={activeIndex}
        onChangePage={setActiveIndex}
        totalPages={totalPages}
      />
      <div className='flex flex-col md:flex-row gap-6 mt-6'>
        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
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
        <WeatherSection isFetching={isForecastFetching} data={forecastData} />
      </div>
      <div className='mt-10 md:w-[calc(100%-274px)]'>
        <h3 className='text-xl font-bold mb-6'>Traffic Camera</h3>
        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-6'>
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
      </div>
      <CustomPagination
        activeIndex={activeIndex}
        onChangePage={setActiveIndex}
        totalPages={totalPages}
      />
    </div>
  );
};

export default LocationList;
