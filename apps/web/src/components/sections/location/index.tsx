import React from 'react';
import LocationCard from '@/components/ui/location-card';
import { TrafficCameraData } from '@/common/type/location';
import { Loader2 } from 'lucide-react';
import { endpoints } from '@/lib/endpoints';
import LocationList from './list';

const Location = async ({ dateTime }: { dateTime: string }) => {
  const searchParams = new URLSearchParams({ dateTime });
  const resp =
    dateTime !== ''
      ? await fetch(`${endpoints.traffic}?${searchParams}`)
      : null;
  const locationData: TrafficCameraData[] =
    dateTime !== '' ? await resp.json() : [];

  return (
    <section>
      <div className='container py-6 border-b'>
        <h3 className='text-xl font-bold mb-6'>Popular Locations</h3>
        <>
          {locationData.length !== 0 ? (
            <LocationList locationData={locationData} />
          ) : (
            <p className='text-sm italic'>No locations found</p>
          )}
        </>
      </div>
    </section>
  );
};

export default Location;
