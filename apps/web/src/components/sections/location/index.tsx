import React from 'react';
import LocationCard from '@/components/ui/location-card';
import { TrafficCameraData } from '@/common/type/location';
import { Loader2 } from 'lucide-react';
import { endpoints } from '@/lib/endpoints';
import LocationList from './list';

const Location = ({
  locationData,
  selectedIndex,
  onSelectLocation,
  isFetching,
}: {
  locationData: TrafficCameraData[];
  selectedIndex: number;
  onSelectLocation: (
    index: number,
    latitude: number,
    longitude: number
  ) => void;
  isFetching: boolean;
}) => {
  return (
    <div className='flex-1'>
      <h3 className='text-xl font-bold mb-6'>Popular Locations</h3>
      <>
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
      </>
    </div>
  );
};

export default Location;
