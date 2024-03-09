import React from 'react';
import { TrafficCameraData } from '@/common/type/location';
import { Loader2 } from 'lucide-react';
import LocationList from './list';
import { ForecastData } from '@/common/type/weather';
import dayjs from 'dayjs';

const Location = ({
  locationData,
  forecastData,
  selectedIndex,
  isFetching,
  isForecastFetching,
  showForecast,
  isSuggestMode,
  suggestedDate,
  onSelectLocation,
}: {
  locationData: TrafficCameraData[];
  forecastData: ForecastData[];
  selectedIndex: number;
  isFetching: boolean;
  isForecastFetching: boolean;
  showForecast: boolean;
  isSuggestMode: boolean;
  suggestedDate: string;
  onSelectLocation: (
    index: number,
    latitude: number,
    longitude: number
  ) => void;
}) => {
  return (
    <div className='flex-1'>
      <h3 className='text-xl font-bold mb-6'>Popular Locations</h3>
      {isSuggestMode && (
        <p className='text-sm bg-blue-500 p-2 mb-4 text-center'>
          We are anable to find any location on the selected date. But we are
          showing {dayjs(suggestedDate).utc().format('DD/MM/YYYY hh:mma')} - the
          most recent search by others
        </p>
      )}

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
