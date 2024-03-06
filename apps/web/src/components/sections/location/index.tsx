import React from 'react';
import LocationCard from '@/components/ui/location-card';
import { TrafficCameraData } from '@/common/type/location';
import { Loader2 } from 'lucide-react';
import { endpoints } from '@/lib/endpoints';
import LocationList from './list';
import { ForecastData } from '@/common/type/weather';
import WeatherSection from '../weather';
import { cn } from '@/lib/utils';
import CameraSection from '../camera';

const Location = ({
  locationData,
  forecastData,
  selectedIndex,
  isFetching,
  isForecastFetching,
  showForecast,
  onSelectLocation,
}: {
  locationData: TrafficCameraData[];
  forecastData: ForecastData[];
  selectedIndex: number;
  onSelectLocation: (
    index: number,
    latitude: number,
    longitude: number
  ) => void;
  isFetching: boolean;
  isForecastFetching: boolean;
  showForecast: boolean;
}) => {
  return (
    <div className='flex-1'>
      <h3 className='text-xl font-bold mb-6'>Popular Locations</h3>
      <div className='flex flex-col md:flex-row gap-6'>
        {isFetching ? (
          <Loader2 className='mr-2 h-8 w-8 animate-spin' />
        ) : (
          <>
            {locationData.length !== 0 ? (
              <LocationList
                locationData={locationData}
                onSelectLocation={onSelectLocation}
                selectedIndex={selectedIndex}
              />
            ) : (
              <p className='text-sm italic'>No locations found</p>
            )}
          </>
        )}
        <WeatherSection
          isFetching={isForecastFetching}
          data={forecastData}
          className={cn({
            hidden: !Boolean(showForecast),
          })}
        />
      </div>
      <div>
        {locationData.length !== 0 && !isFetching && (
          <CameraSection locationData={locationData} />
        )}
      </div>
    </div>
  );
};

export default Location;
