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
  isFetching: boolean;
  isForecastFetching: boolean;
  showForecast: boolean;
  onSelectLocation: (
    index: number,
    latitude: number,
    longitude: number
  ) => void;
}) => {
  return (
    <div className='flex-1'>
      <h3 className='text-xl font-bold mb-6'>Popular Locations</h3>
      {isFetching ? (
        <Loader2 className='mr-2 h-8 w-8 animate-spin' />
      ) : (
        <>
          {locationData.length !== 0 ? (
            <LocationList
              locationData={locationData}
              onSelectLocation={onSelectLocation}
              selectedIndex={selectedIndex}
              forecastData={forecastData}
              isForecastFetching={isForecastFetching}
              showForecast={showForecast}
            />
          ) : (
            <p className='text-sm italic'>No locations found</p>
          )}
        </>
      )}
    </div>
  );
};

export default Location;
