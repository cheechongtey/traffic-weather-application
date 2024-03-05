import React from 'react';
import LocationCard from '@/components/ui/location-card';
import { TrafficCameraData } from '@/common/type/location';
import { Loader2 } from 'lucide-react';
import { endpoints } from '@/lib/endpoints';

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
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <>
            {locationData.length !== 0 ? (
              <>
                {locationData.map((x, index) => (
                  <LocationCard
                    {...x}
                    name={x.location_name}
                    onClick={() => {}}
                    key={index}
                  />
                ))}
              </>
            ) : (
              <p className='text-sm italic'>No locations found</p>
            )}
          </>
        </div>
      </div>
    </section>
  );
};

export default Location;
